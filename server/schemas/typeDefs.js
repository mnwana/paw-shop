const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    borough: String
    posts: [Post]
    watchlistCount: Int
    watchlist: [Post]
  }

  type Post {
    _id: ID
    active: Boolean
    title: String
    postText: String
    animalType: String
    category: String
    condition: String
    createdAt: String
    user: User
    watching: [User]
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    userId: ID
    replies: [Reply]
    updatedAt: String
  }

  type Reply {
    _id: ID
    replyBody: String
    createdAt: String
    userId: ID
  }


  input PostInput{
    title: String
    postText: String
    animalType: String
    category: String
    condition: String
  }

  input FilterState{
    pageNum: Int
    postsPerPage: Int
    newestFirst: Boolean
    animalType: [String]!
    category: [String]!
    condition: [String]!
  }


  type Auth {
    token: ID!
    user: User
  }

  type FilterResults{
    posts: [Post]
    totalPages: Int
  }

  
  type Query {
    me: User
    filteredPosts(filterState: FilterState!): FilterResults
    userActivePosts(pageNum: Int!, postsPerPage: Int!, newestFirst: Boolean!): FilterResults
    userInactivePosts(pageNum: Int!, postsPerPage: Int!, newestFirst: Boolean!): FilterResults
    userActiveWatchedPosts(pageNum: Int!, postsPerPage: Int!, newestFirst: Boolean!): FilterResults
    userInactiveWatchedPosts(pageNum: Int!, postsPerPage: Int!, newestFirst: Boolean!): FilterResults
    users: [User]
    user(_id: ID!): User
    posts(userId: ID): [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, borough: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postData: PostInput!): Post
    addWatching(postId: ID!): User
    addComment(postId: ID!, commentBody: String!): Comment
    addReply(postId: ID!, commentId: ID!, replyBody: String!): Comment
  }
`;

module.exports = typeDefs;
