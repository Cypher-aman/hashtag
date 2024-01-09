import { graphql } from '@/gql';

export const createPostMutation = graphql(`
  #graphql
  mutation createPost($payload: CreatePostInput!) {
    createPost(payload: $payload) {
      id
    }
  }
`);

export const likePostMutation = graphql(`
  #graphql
  mutation LikePost($postId: String!) {
    likePost(postId: $postId)
  }
`);

export const unlikePostMutation = graphql(`
  #graphql
  mutation UnlikePost($postId: String!) {
    unlikePost(postId: $postId)
  }
`);

export const createReplyMutation = graphql(`
  #graphql
  mutation CreateReply($payload: CreateReplyInput!) {
    createReply(payload: $payload)
  }
`);
