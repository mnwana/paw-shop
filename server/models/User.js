const { Schema, model } = require('mongoose');
const { ENUM } = require('sequelize/types');
const dateFormat = require('../utils/dateFormat');
const Watchlist = require('./Watchlist')
const Post = require('./Post')

const UserSchema = new Schema({
    
    username: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 16,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [validateEmail, 'Email address is invalid']
    },
    borough: {
        type: String,
        enum: ["Manhattan", "Brooklyn", "Queens", "Staten Island", "The Bronx"],
        required: true,
        trim: true
      },
    posts: [postSchema],
    watchlist: [WatchlistSchema]
},
{
    toJSON: {
        virtuals: true, 
    }, 
    id: false
  });

const User = model('User', UserSchema);

module.exports = User;
