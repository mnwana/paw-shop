const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    posts: [postSchema],
    watchlist: [WatchlistSchema]
},
{
    toJSON: {
        virtuals: true, 
        getters: true
    }, 
    id: false
  });

  const WatchlistSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      UserId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      PostId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      replyBody: {
        type: String,
        required: true
      },
      writtenBy: {
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
      }
    }
  );

const Users = model('Users', UsersSchema);

module.exports = Comment;
