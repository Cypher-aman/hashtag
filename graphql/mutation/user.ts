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
