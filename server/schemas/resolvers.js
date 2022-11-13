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
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("posts")
        .populate("watchlist");
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
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
          username: context.user.username,
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
          { $push: { watching: postId } },
          { new: true }
        );
        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, args, context) => {
      if (context.user) {
        const comment = await Comment.create({
          ...args,
          username: context.user.username,
        });
        await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { comments: comment._id } },
          { new: true }
        );

        return thought;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addReply: async (parent, { commentId, replyBody }, context) => {
      if (context.user) {
        const updatedComment = await Comment.findOneAndUpdate(
          { _id: commentId },
          {
            $push: { replies: { replyBody, username: context.user.username } },
          },
          { new: true, runValidators: true }
        );

        return updatedComment;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
