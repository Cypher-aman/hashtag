import { GraphQL } from '@/client/api';
import { LoggedInUserContext } from '@/context/LoggedInUserContext';
import { UserContext } from '@/context/ProfileUserContext';
import { User } from '@/gql/graphql';
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
  return { user: userState?.user as ExtendedUser, status: userState?.status };
};

export const useLoggedInUserContext = () => {
  const userState = useContext(LoggedInUserContext);
  return { user: userState?.user as User, status: userState?.status };
};
