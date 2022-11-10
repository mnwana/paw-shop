const usersSeed = require('./usersSeed.json');
const postsSeed = require('./postsSeed.json');
const db = require('../config/connection');
const { users, Posts } = require('../models');

db.once('open', async () => {
    try {
        await Posts.deleteMany({});
        await users.deleteMany({});

        await users.create(usersSeed);

        for (let i = 0; i < postsSeed.length; i++) {
            const {_id, postAuthor} = await Posts.create(postsSeed[i]);
            const user = await users.findOneAndUpdate(
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