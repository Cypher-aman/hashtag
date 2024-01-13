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
      bio
      coverPicUrl

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

export const checkUserNameQuery = graphql(`
  #graphlql
  query checkUserName($userName: String!) {
    checkUserName(userName: $userName)
  }
`);

export const checkUserEmailQuery = graphql(`
  #graphql
  query checkUserEmail($email: String!) {
    checkUserEmail(email: $email)
  }
`);

export const verifyOTPQuery = graphql(`
  #graphql
  query verifyOTP($to: String!, $otp: Int!) {
    verifyOTP(to: $to, otp: $otp)
  }
`);

export const signInQuery = graphql(`
  #graphql
  query signInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password)
  }
`);

export const getSearchUsersQuery = graphql(`
  #graphql
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
      userName
      firstName
      lastName
      profilePicUrl
    }
  }
`);

export const getNotificationsQuery = graphql(`
  #graphql
  query GetNotifications {
    getNotifications {
      type
      sender {
        userName
        firstName
        lastName
        profilePicUrl
      }
      postId
      commentId
    }
  }
`);

export const getUserLikedPostsQuery = graphql(`
  #graphql
  query GetUserLikedPosts($userId: String!) {
    getUserLikedPosts(userId: $userId) {
      id
      content
      imageUrl
      createdAt
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
      replies {
        id
      }
    }
  }
`);

export const getUserBookmarkedPostsQuery = graphql(`
  #grapqhl
  query GetUserBookmarkedPosts {
    getUserBookmarkedPosts {
      id
      content
      imageUrl
      createdAt
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
      replies {
        id
      }
    }
  }
`);

export const getUserPostsWithMediaQuery = graphql(`
  #graphql
  query GetUserPostsWithMedia($userId: String!) {
    getUserPostsWithMedia(userId: $userId) {
      id
      content
      imageUrl
      createdAt
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
      replies {
        id
      }
    }
  }
`);
