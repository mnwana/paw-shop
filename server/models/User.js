const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    
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
    borough: {
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
      UserId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      PostId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      },
      writtenBy: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const User = model('User', UserSchema);

module.exports = User;
