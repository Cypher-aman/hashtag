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
      isBookmarked
      bookmarkCount
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
      isBookmarked
      bookmarkCount
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
      likeCount
      parentId
      createdAt
      likes {
        userId
      }
      author {
        firstName
        lastName
        profilePicUrl
        userName
      }
      replies {
        id
        content
        likeCount
        createdAt
        imageUrl
        author {
          firstName
          lastName
          profilePicUrl
          userName
        }
        replies {
          id
        }
        isLiked
        likes {
          userId
        }
      }
    }
  }
`);

export const getSearchPostsQuery = graphql(`
  #graphql
  query GetPosts($query: String!) {
    getPosts(query: $query) {
      id
      content
      imageUrl
      author {
        profilePicUrl
        firstName
        lastName
        userName
      }
      createdAt
    }
  }
`);
