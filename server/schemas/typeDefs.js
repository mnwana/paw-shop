const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
    addComment(commentBody: String!): Comment
    addReply(commentId: ID!, replyBody: String!): Comment
  }
`;

module.exports = typeDefs;
