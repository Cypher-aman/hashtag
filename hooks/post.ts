import { GraphQL } from '@/client/api';
import { CreatePostInput } from '@/gql/graphql';
import { createPostMutation } from '@/graphql/mutation/post';
import { getAllPostsQuery } from '@/graphql/query/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await GraphQL.request(getAllPostsQuery),
  });

  return { ...query, posts: query.data?.getAllPosts };
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: CreatePostInput) =>
      await GraphQL.request(createPostMutation, { payload }),
    onMutate: () => toast.loading('Posting...', { id: '1' }),
    onSuccess: async () => {
      toast.success('Posted!', { id: '1' });
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      toast.error('Failed to post', { id: '1' });
    },
  });

  return mutation;
};
