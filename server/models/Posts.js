const { Schema, model } = require('mongoose');

const postsSchema = new Schema(
    {   
        postsText: {
            type: String,
            required: 'Please describe your product you want to exchange!',
            minlength: 1,
            maxlength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        comments: [commentSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

commentSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Posts = model('Posts', postsSchema);

module.exports = Posts;