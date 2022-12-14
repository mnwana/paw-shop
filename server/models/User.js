const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 16,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [/[a-z0-9._]+@[a-z]+\.[a-z]{2,3}/, "Email address is invalid"],
      unique: true
    },
    password: {
      type: String, 
      required: true
    },
    // borough: {
    //   type: String,
    //   enum: ["manhattan", "brooklyn", "queens", "staten island", "the bronx"],
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    watchlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual("watchlistCount").get(function () {
  return this.watchlist.length;
});

const User = model("User", userSchema);

module.exports = User;
