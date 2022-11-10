const { Schema, model } = require('mongoose');

const Posts = new Schema({
    
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    posts: [],
},
{
    toJSON: {
        virtuals: true, 
        getters: true
    }, 
    id: false
  });