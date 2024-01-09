/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  mutation createPost($payload: CreatePostInput!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n": types.CreatePostDocument,
    "\n  #graphql\n  mutation LikePost($postId: String!) {\n    likePost(postId: $postId)\n  }\n": types.LikePostDocument,
    "\n  #graphql\n  mutation UnlikePost($postId: String!) {\n    unlikePost(postId: $postId)\n  }\n": types.UnlikePostDocument,
    "\n  #graphql\n  mutation CreateReply($payload: CreateReplyInput!) {\n    createReply(payload: $payload)\n  }\n": types.CreateReplyDocument,
    "\n  #graphql\n  mutation FollowUser($to: String!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "\n  #graphql\n  mutation UnfollowUser($to: String!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserDocument,
    "\n  #graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageUrl\n      author {\n        id\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      isLiked\n      likeCount\n      likes {\n        userId\n      }\n      replies {\n        id\n      }\n      createdAt\n    }\n  }\n": types.GetAllPostsDocument,
    "\n  #graphql\n  query GetUserPosts($userName: String!) {\n    getUserPosts(userName: $userName) {\n      id\n      content\n      imageUrl\n      author {\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      isLiked\n      likeCount\n      likes {\n        userId\n      }\n      replies {\n        id\n      }\n      createdAt\n    }\n  }\n": types.GetUserPostsDocument,
    "\n  #graphql\n  query getPresignerURL($imageType: String!, $imageName: String!) {\n    getPresignerURL(imageType: $imageType, imageName: $imageName)\n  }\n": types.GetPresignerUrlDocument,
    "\n  #graphql\n  query GetRepliesToPost($postId: String!) {\n    getRepliesToPost(postId: $postId) {\n      id\n      content\n      imageUrl\n      isLiked\n      likes {\n        userId\n      }\n      author {\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      replies {\n        id\n        content\n        postId\n        parentId\n        replies {\n          id\n        }\n      }\n    }\n  }\n": types.GetRepliesToPostDocument,
    "\n  #graphql\n  query GetNestedReplies($parentId: String!) {\n    getNestedReplies(parentId: $parentId) {\n      id\n      content\n      imageUrl\n      postId\n      parentId\n      author {\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      replies {\n        id\n        content\n        imageUrl\n        parentId\n        author {\n          firstName\n          lastName\n          userName\n          profilePicUrl\n        }\n      }\n    }\n  }\n": types.GetNestedRepliesDocument,
    "\n  #graphql\n  query getUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": types.GetUserGoogleTokenDocument,
    "\n  #graphql\n  query getUserInfo {\n    getUserInfo {\n      id\n      lastName\n      firstName\n      email\n      userName\n      profilePicUrl\n    }\n  }\n": types.GetUserInfoDocument,
    "\n  #graphql\n  query GetUserByName($userName: String!) {\n    getUserByName(userName: $userName) {\n      id\n      firstName\n      lastName\n      userName\n      email\n      profilePicUrl\n\n      follower {\n        id\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n\n      following {\n        id\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n    }\n  }\n": types.GetUserByNameDocument,
    "\n  #graphql\n  query GetRecommendedUsers {\n    getRecommendedUsers {\n      firstName\n      lastName\n      id\n      email\n      userName\n      profilePicUrl\n\n      follower {\n        id\n      }\n\n      following {\n        id\n      }\n    }\n  }\n": types.GetRecommendedUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation createPost($payload: CreatePostInput!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation createPost($payload: CreatePostInput!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation LikePost($postId: String!) {\n    likePost(postId: $postId)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation LikePost($postId: String!) {\n    likePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnlikePost($postId: String!) {\n    unlikePost(postId: $postId)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnlikePost($postId: String!) {\n    unlikePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation CreateReply($payload: CreateReplyInput!) {\n    createReply(payload: $payload)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreateReply($payload: CreateReplyInput!) {\n    createReply(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation FollowUser($to: String!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation FollowUser($to: String!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnfollowUser($to: String!) {\n    unfollowUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnfollowUser($to: String!) {\n    unfollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageUrl\n      author {\n        id\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      isLiked\n      likeCount\n      likes {\n        userId\n      }\n      replies {\n        id\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageUrl\n      author {\n        id\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      isLiked\n      likeCount\n      likes {\n        userId\n      }\n      replies {\n        id\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetUserPosts($userName: String!) {\n    getUserPosts(userName: $userName) {\n      id\n      content\n      imageUrl\n      author {\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      isLiked\n      likeCount\n      likes {\n        userId\n      }\n      replies {\n        id\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetUserPosts($userName: String!) {\n    getUserPosts(userName: $userName) {\n      id\n      content\n      imageUrl\n      author {\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      isLiked\n      likeCount\n      likes {\n        userId\n      }\n      replies {\n        id\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getPresignerURL($imageType: String!, $imageName: String!) {\n    getPresignerURL(imageType: $imageType, imageName: $imageName)\n  }\n"): (typeof documents)["\n  #graphql\n  query getPresignerURL($imageType: String!, $imageName: String!) {\n    getPresignerURL(imageType: $imageType, imageName: $imageName)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetRepliesToPost($postId: String!) {\n    getRepliesToPost(postId: $postId) {\n      id\n      content\n      imageUrl\n      isLiked\n      likes {\n        userId\n      }\n      author {\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      replies {\n        id\n        content\n        postId\n        parentId\n        replies {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetRepliesToPost($postId: String!) {\n    getRepliesToPost(postId: $postId) {\n      id\n      content\n      imageUrl\n      isLiked\n      likes {\n        userId\n      }\n      author {\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      replies {\n        id\n        content\n        postId\n        parentId\n        replies {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetNestedReplies($parentId: String!) {\n    getNestedReplies(parentId: $parentId) {\n      id\n      content\n      imageUrl\n      postId\n      parentId\n      author {\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      replies {\n        id\n        content\n        imageUrl\n        parentId\n        author {\n          firstName\n          lastName\n          userName\n          profilePicUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetNestedReplies($parentId: String!) {\n    getNestedReplies(parentId: $parentId) {\n      id\n      content\n      imageUrl\n      postId\n      parentId\n      author {\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n      replies {\n        id\n        content\n        imageUrl\n        parentId\n        author {\n          firstName\n          lastName\n          userName\n          profilePicUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"): (typeof documents)["\n  #graphql\n  query getUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getUserInfo {\n    getUserInfo {\n      id\n      lastName\n      firstName\n      email\n      userName\n      profilePicUrl\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getUserInfo {\n    getUserInfo {\n      id\n      lastName\n      firstName\n      email\n      userName\n      profilePicUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetUserByName($userName: String!) {\n    getUserByName(userName: $userName) {\n      id\n      firstName\n      lastName\n      userName\n      email\n      profilePicUrl\n\n      follower {\n        id\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n\n      following {\n        id\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetUserByName($userName: String!) {\n    getUserByName(userName: $userName) {\n      id\n      firstName\n      lastName\n      userName\n      email\n      profilePicUrl\n\n      follower {\n        id\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n\n      following {\n        id\n        firstName\n        lastName\n        userName\n        profilePicUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetRecommendedUsers {\n    getRecommendedUsers {\n      firstName\n      lastName\n      id\n      email\n      userName\n      profilePicUrl\n\n      follower {\n        id\n      }\n\n      following {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetRecommendedUsers {\n    getRecommendedUsers {\n      firstName\n      lastName\n      id\n      email\n      userName\n      profilePicUrl\n\n      follower {\n        id\n      }\n\n      following {\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;