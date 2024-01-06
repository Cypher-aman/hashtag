import { graphql } from '@/gql';

export const getUserGoogleToken = graphql(`
  #graphql
  query getUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getUserInfoQuery = graphql(`
  #graphql
  query getUserInfo {
    getUserInfo {
      id
      lastName
      firstName
      email
      userName
      profilePicUrl
    }
  }
`);

export const getUserByNameQuery = graphql(`
  #graphql
  query GetUserByName($userName: String!) {
    getUserByName(userName: $userName) {
      id
      firstName
      lastName
      userName
      email
      profilePicUrl

      follower {
        id
        firstName
        lastName
        userName
        profilePicUrl
      }

      following {
        id
        firstName
        lastName
        userName
        profilePicUrl
      }
    }
  }
`);

export const getRecommendedUserQuery = graphql(`
  #graphql
  query GetRecommendedUsers {
    getRecommendedUsers {
      firstName
      lastName
      id
      email
      userName
      profilePicUrl

      follower {
        id
      }

      following {
        id
      }
    }
  }
`);
