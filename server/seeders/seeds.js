// const faker = require('faker');
// const userSeeds = require('./userSeed.json');
const commentSeeds = require('./commentSeed.json');
const db = require('../config/connection');
const { Comment } = require('../models');

db.once('open', async () => {
  try {
    await Comment.deleteMany({});
    // await User.deleteMany({});

    // await User.create(userSeeds);

    for (let i = 0; i < commentSeeds.length; i++) {
      const { _id, commentAuthor } = await Comment.create(commentSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: commentAuthor },
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

  console.log('all done!');
  process.exit(0);
});