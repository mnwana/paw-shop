const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    borough: String
    friendCount: Int
    posts: [Post]
    watchlist: [WatchList]
  }

  type Post {
    _id: ID
    postText: String
    animalType: String
    category: String
    condition: String
    createdAt: String
    username: String
    watching: [User]
    commentCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
    replies: [Reply]
  }

  type Reply {
    _id: ID
    replyBody: String
    createdAt: String
    username: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addWatching(postId: ID!): User
    addComment(postId: ID!,commentBody: String!): Comment
    addReply(commentId: ID!, replyBody: String!): Comment
  }
`;

module.exports = typeDefs;
