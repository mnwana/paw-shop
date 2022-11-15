import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query posts($userId: ID!) {
    posts(_id: $$userId) {
      _id
      postText
      animalType
      category
      condition
      createdAt
      userId
      watching {
        _id
        username
      }
      commentCount
      comments {
        _id
        createdAt
        userId
        commentBody
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postText
      animalType
      category
      condition
      createdAt
      userId
      watching {
        _id
        username
      }
      commentCount
      comments {
        _id
        createdAt
        userId
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      borough
      posts {
        _id
        postText
        animalType
        condition
        category
        createdAt
        commentCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      borough
      watchlist {
        _id
        postText
        animalType
        condition
        category
        userId
        createdAt
        commentCount
      }
      posts {
        _id
        postText
        animalType
        condition
        category
        createdAt
        commentCount
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      borough
    }
  }
`;
