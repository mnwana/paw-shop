const { AuthenticationError } = require("apollo-server-express");
const { Comment } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {},
  Mutation: {
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
