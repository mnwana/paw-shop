
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
            const params = userId ? {user: userId} : {};
            return await Post.find(params)
                .populate('user')
                .sort({createdAt: -1});
        },

        post: async (parent, {_id}) => {
            return await Post.findById(_id)
                .populate('user');
        },

        filteredPosts: async (parent, {filterState}) => {
            const {
                // pageNum,
                // postsPerPage,
                // newestFirst,
                animalType,
                category,
                condition,
            } = filterState;

            const posts = await Post
                .find({$and: [
                    {animalType: {$in: animalType}},
                    {category: {$in: category}},
                    {condition: {$in: condition}}
                ]})
                .populate('user')
                // .sort({createdAt: newestFirst ? -1 : 1})
                // .skip((pageNum - 1) * postsPerPage)
                // .limit(postsPerPage)
            ;

            const totalPages = 1;

            // let allPosts = await Post
            //     .find({$and: [
            //         {animalType: {$in: animalType}},
            //         {category: {$in: category}},
            //         {condition: {$in: condition}}
            //     ]})
            //     .populate('user')
            // ;

            // const totalPages = Math.ceil(allPosts.length / postsPerPage);
            
            // NONWORKING CODE - perhaps to be revisited at a later date
                // const posts = await Post.aggregate([
                //     {$match: {animalType: {$in: animalType}}},
                //     {$match: {category: {$in: category}}},
                //     {$match: {condition: {$in: condition}}},
                //     {$match: {'user.$.borough': {$in: borough}}},
                //     // {$group: {
                //     //     '_id': '$_id',
                //     //     user: {$push: '$user'}
                //     // }}
                // ]);

                // const totalPages = Math.ceil(await Post.countDocuments({
                //     // QUERY FROM ABOVE WOULD GO HERE
                // }) / postsPerPage);


            return {
                posts,
                totalPages
            };
        },

        userActivePosts: async (parent, {pageNum, postsPerPage, newestFirst}, context) => {
            if (context.user){
                const posts = await Post
                    .find({$and: [
                        {user: {_id: context.user._id}},
                        {active: true},
                    ]})
                    .populate('user')
                    .sort({createdAt: newestFirst ? -1 : 1})
                    .skip((pageNum - 1) * postsPerPage)
                    .limit(postsPerPage)
                ;

                let allPosts = await Post
                    .find({$and: [
                        {user: {_id: context.user._id}},
                        {active: true},
                    ]})
                ;

                const totalPages = Math.ceil(allPosts.length / postsPerPage);

                return {
                    posts,
                    totalPages
                };
            }

            throw new AuthenticationError("Not logged in");            
        },

        userInactivePosts: async (parent, {pageNum, postsPerPage, newestFirst}, context) => {
            if (context.user){
                const posts = await Post
                    .find({$and: [
                        {user: {_id: context.user._id}},
                        {active: false},
                    ]})
                    .populate('user')
                    .sort({createdAt: newestFirst ? -1 : 1})
                    .skip((pageNum - 1) * postsPerPage)
                    .limit(postsPerPage)
                ;

                let allPosts = await Post
                    .find({$and: [
                        {user: {_id: context.user._id}},
                        {active: false},
                    ]})
                ;

                const totalPages = Math.ceil(allPosts.length / postsPerPage);

                return {
                    posts,
                    totalPages
                };
            }

            throw new AuthenticationError("Not logged in");            
        },

        userActiveWatchedPosts: async (parent, {pageNum, postsPerPage, newestFirst}, context) => {
            if (context.user){
                const user = await User
                    .findById(context.user._id)
                    .select('watchlist');

                const watchlistPostIds = user.watchlist.map(post => post._id);
                
                const posts = await Post
                    .find({$and: [
                        {_id: {$in: watchlistPostIds}},
                        {active: true}
                    ]})
                    .populate('user')
                    .sort({createdAt: newestFirst ? -1 : 1})
                    .skip((pageNum - 1) * postsPerPage)
                    .limit(postsPerPage)
                ;

                let allPosts = await Post
                    .find({$and: [
                        {_id: {$in: watchlistPostIds}},
                        {active: true}
                    ]})
                ;

                const totalPages = Math.ceil(allPosts.length / postsPerPage);

                return {
                    posts,
                    totalPages
                };
            }

            throw new AuthenticationError("Not logged in");            
        },

        userInactiveWatchedPosts: async (parent, {pageNum, postsPerPage, newestFirst}, context) => {
            if (context.user){
                const user = await User
                    .findById(context.user._id)
                    .select('watchlist');

                const watchlistPostIds = user.watchlist.map(post => post._id);
                
                const posts = await Post
                    .find({$and: [
                        {_id: {$in: watchlistPostIds}},
                        {active: false}
                    ]})
                    .populate('user')
                    .sort({createdAt: newestFirst ? -1 : 1})
                    .skip((pageNum - 1) * postsPerPage)
                    .limit(postsPerPage)
                ;

                let allPosts = await Post
                    .find({$and: [
                        {_id: {$in: watchlistPostIds}},
                        {active: false}
                    ]})
                ;

                const totalPages = Math.ceil(allPosts.length / postsPerPage);

                return {
                    posts,
                    totalPages
                };
            }

            throw new AuthenticationError("Not logged in");            
        }
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

        addPost: async (parent, {postData}, context) => {
            if (context.user) {
                const postText = postData.description;
                delete postData.description;
                const post = await Post.create({
                    ...postData,
                    postText,
                    user: context.user._id,
                });

                await User.findByIdAndUpdate(
                    context.user._id,
                    {$push: {posts: post._id}},
                    // {new: true}
                );

                return await post.populate('user');
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
                    user: context.user._id,
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
                            user: context.user._id
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