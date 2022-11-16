import { gql } from '@apollo/client';

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
  mutation addUser($username: String!, $email: String!, $password: String!,  $borough: String!) {
    addUser(username: $username, email: $email, password: $password, borough: $borough) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!, $animalType: String!, $category: String!, $condition: String!) {
    addPost(postText: $postText, animalType: $animalType, category: $category, condition: $condition) {
      _id
      postText
      createdAt
      username
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
      commentCount
      comments {
        _id
        commentBody
        createdAt
        userId
      }
    }
  }
`;


export const ADD_REPLY = gql`
  mutation addReply($commentId: ID!,($postId: ID! ,$replyBody: String!) {
    addReply(commentId: $commentId, postId: $postId, replyBody: $replyBody) {
      _id
      replies {
        _id
        replyBody
        createdAt
        userId
      }
    }
  }
`;
