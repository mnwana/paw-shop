const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ReplySchema = require('./Reply');

const CommentSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    commentBody: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);


const Comment = model('Comment', CommentSchema);

module.exports = Comment;
