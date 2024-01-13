import { graphql } from '@/gql';

export const followUserQuery = graphql(`
  #graphql
  mutation FollowUser($to: String!) {
    followUser(to: $to)
  }
`);

export const unfollowUserQuery = graphql(`
  #graphql
  mutation UnfollowUser($to: String!) {
    unfollowUser(to: $to)
  }
`);

export const updateProfileMutation = graphql(`
  #graphql
  mutation UpdateUserProfile($payload: UpdateUserProfileInput!) {
    updateUserProfile(payload: $payload)
  }
`);

export const createUserMutation = graphql(`
  #graphql
  mutation CreateUser($payload: CreateUserInput!) {
    createUser(payload: $payload)
  }
`);

export const generateOTPMutation = graphql(`
  #graohql
  mutation GenerateOTP($to: String!) {
    generateOTP(to: $to)
  }
`);
