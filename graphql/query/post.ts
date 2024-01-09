import { graphql } from '@/gql';

export const getAllPostsQuery = graphql(`
  #graphql
  query GetAllPosts {
    getAllPosts {
      id
      content
      imageUrl
      author {
        id
        firstName
        lastName
        userName
        profilePicUrl
      }
      isLiked
      likeCount
      likes {
        userId
      }
      replies {
        id
      }
      createdAt
    }
  }
`);

export const getUserPostsQuery = graphql(`
  #graphql
  query GetUserPosts($userName: String!) {
    getUserPosts(userName: $userName) {
      id
      content
      imageUrl
      author {
        firstName
        lastName
        userName
        profilePicUrl
      }
      isLiked
      likeCount
      likes {
        userId
      }
      replies {
        id
      }
      createdAt
    }
  }
`);

export const getPresignerURLQuery = graphql(`
  #graphql
  query getPresignerURL($imageType: String!, $imageName: String!) {
    getPresignerURL(imageType: $imageType, imageName: $imageName)
  }
`);

export const getRepliesToPostQuery = graphql(`
  #graphql
  query GetRepliesToPost($postId: String!) {
    getRepliesToPost(postId: $postId) {
      id
      content
      imageUrl
      isLiked
      likes {
        userId
      }
      author {
        firstName
        lastName
        userName
        profilePicUrl
      }
      replies {
        id
        content
        postId
        parentId
        replies {
          id
        }
      }
    }
  }
`);

export const getNestedRepliesQuery = graphql(`
  #graphql
  query GetNestedReplies($parentId: String!) {
    getNestedReplies(parentId: $parentId) {
      id
      content
      imageUrl
      postId
      parentId
      author {
        firstName
        lastName
        userName
        profilePicUrl
      }
      replies {
        id
        content
        imageUrl
        parentId
        author {
          firstName
          lastName
          userName
          profilePicUrl
        }
      }
    }
  }
`);
