// const faker = require('faker');
// const userSeeds = require('./userSeed.json');
const commentSeeds = require("./commentSeed.json");
const db = require("../config/connection");
const { Comment } = require("../models");

db.once("open", async () => {
  try {
    await Comment.deleteMany({});

    for (let i = 0; i < commentSeeds.length; i++) {
      const { _id, username } = await Comment.create(commentSeeds[i]);
      const post = await Post.findOneAndUpdate(
        { username: username },
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

  console.log("all done!");
  process.exit(0);
});
