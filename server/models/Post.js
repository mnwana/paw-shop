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
            enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit / Hamster'],
            required: true
        },
        category: {
            type: String,
            enum: ['Food', 'Toys', 'Furniture', 'Cleaning products', 'Outdoor'],
            required: true
        },
        condition: {
            type: String,
            enum: ['New', 'Like New', 'Okay', 'Bad', 'Ugly' ],
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
        email: {
            type: String,
            required: true,
            trim: true
        },
        comments: [CommentSchema],
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