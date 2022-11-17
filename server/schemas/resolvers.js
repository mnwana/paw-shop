
// IMPORTS
const {AuthenticationError} = require("apollo-server-express");
const {User, Post} = require("../models");
const {signToken} = require("../utils/auth");



const resolvers = {

    // QUERIES
    Query: {
        me: async (parent, args, context) => {
            if (context.user)
                return await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
                    .populate("posts")
                    .populate("watchlist");

            throw new AuthenticationError("Not logged in");
        },

        users: async () => {
            return await User.find()
                .select("-__v -password")
                .populate("posts")
                .populate("watchlist");
        },

        user: async (parent, {_id}) => {
            return await User.findById(_id)
                .select("-__v -password")
                .populate("posts")
                .populate("watchlist");
            },

        posts: async (parent, {userId}) => {
            const params = userId ? {userId} : {};
            return await Post.find(params)
                .sort({createdAt: -1});
        },

        post: async (parent, {_id}) => {
            return await Post.findById({_id});
        },
    },


    // MUTATIONS
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return {token, user};
        },

        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create({
                    ...args,
                    userId: context.user._id,
                });

                await User.findByIdAndUpdate(
                    context.user._id,
                    {$push: {posts: post._id}},
                    // {new: true}
                );

                return post;
            }

            throw new AuthenticationError("Not logged in");
        },

        addWatching: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    context.user._id,
                    {$push: {watchlist: args.postId}},
                    {new: true}
                );
                
                return user;
            }

            throw new AuthenticationError("Not logged in");
        },

        addComment: async (parent, {postId, commentBody}, context) => {
            if (context.user) {
                const comment = await Post.create({
                    ...args,
                    userId: context.user._id,
                });

                const post = await Post.findByIdAndUpdate(
                    postId,
                    {$push: {commentBody, comments: comment._id}},
                    {new: true}
                );

                return post;
            }

            throw new AuthenticationError("Not logged in");
        },

        addReply: async (parent, {postId, commentId, replyBody}, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    {
                        _id: postId,
                        'comments._id': commentId
                    },
                    {
                        $push: {'comments.$.replies': {
                            replyBody,
                            commentId,
                            userId: context.user._id
                        }},
                    },
                    {new: true, runValidators: true}
                );

                return updatedPost;
            }

            throw new AuthenticationError("Not logged in");
        },
  },
};



// EXPORT 
module.exports = resolvers;