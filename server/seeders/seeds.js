// IMPORTS
// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const postSeeds = require('./postSeed.json');
const commentSeeds = require("./commentSeed.json");
const db = require('../config/connection');
const { User, Post, Comment } = require('../models');

// SEED
db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});

        await User.create(userSeeds);

        for (let i = 0; i < postSeeds.length; i++) {
            const {_id, postAuthor} = await Post.create(postSeeds[i]);
            const user = await User.findOneAndUpdate(
                {userId: postAuthor},
                {
                    $addToSet: {
                        posts: _id,
                    }
                }
            );
        }
        
        for (let i = 0; i < commentSeeds.length; i++) {
          const { _id, postId } = await Comment.create(commentSeeds[i]);
          const post = await Post.findOneAndUpdate(
            { _id:postId  },
            {
              $addToSet: {
                comments: _id,
              },
            }
          );
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Seeding completed!');
    process.exit(0);
});
