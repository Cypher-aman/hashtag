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
