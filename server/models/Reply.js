const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema(
    {
      replyBody: {
        type: String,
        required: true,
        trim: true,
        minLength: 1, 
        maxLength: 100
      },
      username: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      },
      id: false
    }
  );

module.exports = replySchema;