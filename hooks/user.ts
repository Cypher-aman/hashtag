import { GraphQL } from '@/client/api';
import { getUserInfoQuery } from '@/graphql/query/user';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = () => {
  const query = useQuery({
    queryKey: ['user_info'],
    queryFn: async () => await GraphQL.request(getUserInfoQuery),
  });

  return { ...query, user: query.data?.getUserInfo };
};
