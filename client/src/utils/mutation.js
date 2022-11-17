import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $borough: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      borough: $borough
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost(
    $postText: String!
    $animalType: String!
    $category: String!
    $condition: String!
  ) {
    addPost(
      postText: $postText
      animalType: $animalType
      category: $category
      condition: $condition
    ) {
      _id
      postText
      createdAt
      userId
      animalType
      condition
      category
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      _id
      postText
      createdAt
      username
      animalType
      condition
      category
      userId
      commentCount
      watchingCount
      watching {
        _id
      }
      comments {
        _id
        commentBody
        updatedAt
        createdAt
        userId
        replies {
          _id
          replyBody
          createdAt
          userId
        }
      }
    }
  }
`;

export const ADD_REPLY = gql`
  mutation addReply($commentId: ID!, $postId: ID!, $replyBody: String!) {
    addReply(commentId: $commentId, postId: $postId, replyBody: $replyBody) {
      _id
      postText
      createdAt
      username
      animalType
      condition
      category
      userId
      commentCount
      watchingCount
      watching {
        _id
      }
      comments {
        _id
        commentBody
        updatedAt
        createdAt
        userId
        replies {
          _id
          replyBody
          createdAt
          userId
        }
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deletecomment($postId: ID!, $commentId: ID!) {
    deletecomment(postId: $postId, commentId: $commentId) {
      _id
      postText
      createdAt
      username
      animalType
      condition
      category
      userId
      commentCount
      watchingCount
      watching {
        _id
      }
      comments {
        _id
        commentBody
        updatedAt
        createdAt
        userId
        replies {
          _id
          replyBody
          createdAt
          userId
        }
      }
    }
  }
`;

export const DELETE_REPLY = gql`
  mutation deleteReply($commentId: ID!, $postId: ID!, $replyId: ID!) {
    deleteReply(commentId: $commentId, postId: $postId, replyId: $replyId) {
      _id
      postText
      createdAt
      username
      animalType
      condition
      category
      userId
      commentCount
      watchingCount
      watching {
        _id
      }
      comments {
        _id
        commentBody
        updatedAt
        createdAt
        userId
        replies {
          _id
          replyBody
          createdAt
          userId
        }
      }
    }
  }
`;

export const UPDATE_POST = gql`
  updatePost($postId: ID!, $postText: String!, $animalType: String!, $category: String!, $condition: String!) {
    updatePost(postId: $postId, postText: $postText, animalType: $animalType, category: $category, condition: $condition) {
      _id
      postText
      createdAt
      username
      animalType
      condition
      category
      userId
      commentCount
      watchingCount
      watching{
        _id
      }
      comments {
        _id
        commentBody
        updatedAt
        createdAt
        userId
        replies {
          _id
          replyBody
          createdAt
          userId
        }
      }
    }
  }
`;
