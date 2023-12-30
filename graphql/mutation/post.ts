import { graphql } from '@/gql';

export const createPostMutation = graphql(`
  #graphql
  mutation createPost($payload: CreatePostInput!) {
    createPost(payload: $payload) {
      id
    }
  }
`);
