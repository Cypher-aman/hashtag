import { GraphQL } from '@/client/api';
import { getUserByNameQuery, getUserInfoQuery } from '@/graphql/query/user';
import { useQuery } from '@tanstack/react-query';

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
