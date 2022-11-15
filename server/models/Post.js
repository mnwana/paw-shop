const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
    {   
        postText: {
            type: String,
            required: 'Please describe your product you want to exchange!',
            minLength: 1,
            maxLength: 300,
            trim: true,
        },
        animalType: {
            type: String,
            enum: ['dog', 'cat', 'bird', 'fish', 'rabbit / hamster'],
            required: true
        },
        category: {
            type: String,
            enum: ['food', 'toys', 'furniture', 'cleaning products', 'outdoor'],
            required: true
        },
        condition: {
            type: String,
            enum: ['new', 'like new', 'okay', 'bad', 'ugly' ],
            required: true
        },
        watching: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true,
            trim: true
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

postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;