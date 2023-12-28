import { graphql } from '@/gql';

export const getUserGoogleToken = graphql(`
  #graphql
  query getUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);
