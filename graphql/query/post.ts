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
