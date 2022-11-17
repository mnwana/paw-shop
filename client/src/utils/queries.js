import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query posts($userId: ID!) {
    posts(_id: $userId) {
      _id
      postText
      animalType
      category
      condition
      active
      createdAt
      userId
      watchingCount
      watching {
        _id
        username
      }
      commentCount
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
      active
      createdAt
      userId
      watchingCount
      watching {
        _id
        username
      }
      commentCount
      comments {
        _id
        createdAt
        updatedAt
        userId
        commentBody
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

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      posts {
        _id
        postText
        animalType
        condition
        active
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
      watchlist {
        _id
        postText
        animalType
        condition
        active
        category
        userId
        createdAt
        commentCount
      }
      posts {
        _id
        postText
        animalType
        active
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
    }
  }
`;



export const FILTERED_POSTS = gql`
  query ($filterState: FilterState!){
    filteredPosts(filterState: $filterState) {
      totalPages
      posts {
        _id
        title
        createdAt
        animalType
        category
        condition
        active
        user {
          username
        }
      }
    }
  }
`;
