const { AuthenticationError } = require("apollo-server-express");

const { User, Post } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("posts")
          .populate("watchlist");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("posts")
        .populate("watchlist");
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id })
        .select("-__v -password")
        .populate("posts")
        .populate("watchlist");
    },
    posts: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          userId: context.user._id,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addWatching: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { watchlist: postId } },
          { new: true }
        );
        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        const comment = await Post.create({
          ...args,
          userId: context.user._id,
        });
        await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { commentBody, comments: comment._id } },
          { new: true }
        );

        return comment;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addReply: async (parent, { postId, commentId, replyBody }, context) => {
      if (context.user) {
        const updatedComment = await Post.findOneAndUpdate(
          { _id: postId, "comments._id": commentId },
          {
            $push: {
              "comments.$.replies": {
                replyBody,
                commentId,
                userId: context.user._id,
              },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedComment;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    deleteComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $pull: { comments: commentId } },
          { new: true }
        );
        return updatedPost;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    deleteReply: async (parent, { postId, commentId, replyId }, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId, "comments._id": commentId },
          {
            $pull: {
              "comments.$.replies": {
                replyId,
                commentId,
              },
            },
          },
          { new: true }
        );
        return updatedPost;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    updatePost: async (parent, {postId, postText, animalType, category, condition}, context) => {
      if (context.user) {
        const post = await Post.findByIdAndUpdate(
          { _id: postId },
          { $set: {
            postText: postText ? postText : undefined,
            animalType: animalType ? animalType : undefined,
            category: category ? category : undefined,
            condition:  condition ? condition : undefined
        }
      },
          { new: true }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
