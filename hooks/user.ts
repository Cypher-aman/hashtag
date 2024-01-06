import { GraphQL } from '@/client/api';
import { UserContext } from '@/context/ProfileUserContext';
import {
  getRecommendedUserQuery,
  getUserByNameQuery,
  getUserInfoQuery,
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
    queryKey: ['user_by_name', userName],
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
  // if (!userState?.user) {
  //   return null;
  // }
  return { user: userState?.user as ExtendedUser, status: userState?.status };
};
