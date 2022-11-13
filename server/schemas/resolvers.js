const { AuthenticationError } = require("apollo-server-express");
const { Comment, User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({_id: context.user.id})
          .select('-__v -password')
          .populate('posts');
          // if we want to add friends componant
          // .populate('friends');

        return userData
      }

      throw new AuthenticationError('Not logged in');
    },
    posts: async (parent, {username}) => {
      const params = username ? {username} : {};
      return Post.find(params).sort({ createAt: -1 });
    },
    posts: async (parent, {_id}) => {
      return Post.findOne({_id});
    }
  },

  Mutation: {
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({...args, username: context.user.username});

        await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$push: {posts: post._id}},
          {new: true}
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
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
