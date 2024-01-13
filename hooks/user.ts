import { GraphQL } from '@/client/api';
import { LoggedInUserContext } from '@/context/LoggedInUserContext';
import { UserContext } from '@/context/ProfileUserContext';
import { User } from '@/gql/graphql';
import {
  getNotificationsQuery,
  getRecommendedUserQuery,
  getUserBookmarkedPostsQuery,
  getUserByNameQuery,
  getUserInfoQuery,
  getUserLikedPostsQuery,
  getUserPostsWithMediaQuery,
} from '@/graphql/query/user';
import { ExtendedUser } from '@/utils/interfaces';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

export const useGetUser = () => {
  const query = useQuery({
    queryKey: ['user_info'],
    queryFn: async () => await GraphQL.request(getUserInfoQuery),
  });

  return { ...query, user: query.data?.getUserInfo };
};

export const useUserByName = (userName: string) => {
  const query = useQuery({
    queryKey: ['user_by_name'],
    queryFn: async () =>
      await GraphQL.request(getUserByNameQuery, { userName }),
  });

  return { ...query, currentUser: query.data?.getUserByName };
};

export const useRecommendedUsers = () => {
  const { status, data } = useQuery({
    queryKey: ['recommended_users'],
    queryFn: async () => await GraphQL.request(getRecommendedUserQuery),
  });

  return { status, recommendedUsers: data?.getRecommendedUsers };
};

export const useCurrentUserContext = () => {
  const userState = useContext(UserContext);
  return { user: userState?.user as ExtendedUser, status: userState?.status };
};

export const useLoggedInUserContext = () => {
  const userState = useContext(LoggedInUserContext);
  return { user: userState?.user as User, status: userState?.status };
};

export const useNotifications = () => {
  const { status, data } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => await GraphQL.request(getNotificationsQuery),
  });

  return { status, notifications: data?.getNotifications };
};

export const useLikedPosts = (userId: string) => {
  const { status, data } = useQuery({
    queryKey: ['liked_posts'],
    queryFn: async () =>
      await GraphQL.request(getUserLikedPostsQuery, { userId }),
  });

  return { status, likedPosts: data?.getUserLikedPosts };
};

export const useBookmarkedPosts = () => {
  const { status, data } = useQuery({
    queryKey: ['bookmarked_posts'],
    queryFn: async () => await GraphQL.request(getUserBookmarkedPostsQuery),
  });

  return { status, bookmarkedPosts: data?.getUserBookmarkedPosts };
};

export const usePostsWithMedia = (userId: string) => {
  const { status, data } = useQuery({
    queryKey: ['posts_with_media'],
    queryFn: async () =>
      GraphQL.request(getUserPostsWithMediaQuery, { userId }),
  });

  return { status, posts: data?.getUserPostsWithMedia };
};
