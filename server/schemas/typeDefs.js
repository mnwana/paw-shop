const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    _id: ID
    postText: String
    animalType: String
    category: String
    condition: String
    watching: Int
    createdAt: String
    username: String
    comments: [Comment]
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String!): [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    addPost(postText: String!): Post
    addComment(commentBody: String!): Comment
    addReply(commentId: ID!, replyBody: String!): Comment
  }
`;

module.exports = typeDefs;
