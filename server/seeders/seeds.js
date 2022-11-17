// IMPORTS
import postSeeds from './postSeed';

// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const db = require('../config/connection');
const { User, Post } = require('../models');

// SEED
db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Post.deleteMany({});

        const users = await User.create(userSeeds);

        for (let i = 0; i < postSeeds.length; i++) {
            const {_id, userId} = await Post.create(postSeeds[i]);
            const user = await User.findOneAndUpdate(
                {_id: userId},
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

    console.log('Seeding completed!');
    process.exit(0);
});
