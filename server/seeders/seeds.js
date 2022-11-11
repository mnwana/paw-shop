const userSeed = require('./userSeed.json');
const postSeed = require('./postSeed.json');
const db = require('../config/connection');
const { User, Post } = require('../models');

db.once('open', async () => {
    try {
        await Post.deleteMany({});
        await User.deleteMany({});

        await User.create(userSeed);

        for (let i = 0; i < postSeed.length; i++) {
            const {_id, postAuthor} = await Post.create(postSeed[i]);
            const user = await User.findOneAndUpdate(
                {username: postAuthor},
                {
                    $addToSet: {
                        posts: _id,
                    }
                }
            );
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('All done!');
    process.exit(0);
});