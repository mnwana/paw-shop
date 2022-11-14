const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const replySchema = require('./Reply');

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    commentBody: {
      type: String,
      required: true,
      trim: true,
      minLength: 1, 
      maxLength: 100
    },
    replies: [replySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    timestamps: { createdAt: true, updatedAt: true },
    id: false
  }
);

module.exports = commentSchema;
