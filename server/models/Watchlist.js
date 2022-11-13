
const { Schema, model } = require('mongoose');

const WatchlistSchema = new Schema(
    
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },
  {
    toJSON: {
    }, 
    id: false
  });

  Watchlist.virtual('Watched').get(function() {
    return this.postId.length;
});

