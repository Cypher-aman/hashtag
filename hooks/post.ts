import { GraphQL } from '@/client/api';
import { PostContext, PostContextInterface } from '@/context/PostContext';
import { CreatePostInput, CreateReplyInput, Post, Reply } from '@/gql/graphql';
import {
  createPostMutation,
  createReplyMutation,
  likePostMutation,
  unlikePostMutation,
} from '@/graphql/mutation/post';
import { getAllPostsQuery, getRepliesToPostQuery } from '@/graphql/query/post';
import { getUserPostsQuery } from '@/graphql/query/post';
import { PostAndReplyInterface } from '@/utils/interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { use, useEffect, useState } from 'react';
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

export const useUserPosts = (userName: string, userId: string) => {
  const { status, data, isFetching } = useQuery({
    queryKey: ['user_posts', userName],
    queryFn: async () => await GraphQL.request(getUserPostsQuery, { userName }),
    enabled: !!userId,
  });

  return { status, isFetching, posts: (data?.getUserPosts as Post[]) || [] };
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: CreateReplyInput) => {
      await GraphQL.request(createReplyMutation, { payload });
    },
    onMutate: () => {
      toast.loading('Replying...', { id: '3' });
    },
    onSuccess: async () => {
      toast.success('Replied!', { id: '3' });
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      toast.error('Failed to reply', { id: '3' });
    },
  });

  return mutation;
};

export const usePostDetails = (postId: string) => {
  const { status, data } = useQuery({
    queryKey: [postId],
    queryFn: async () =>
      await GraphQL.request(getRepliesToPostQuery, { postId }),
  });

  return { status, data };
};

export const usePostContext = (key: string, postArr: (Post | Reply)[]) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();
  const [posts, setPosts] = useState<(Post | Reply)[]>(postArr);

  useEffect(() => {
    setPosts(postArr);
  }, [postArr]);

  const updatePost = (keyName: string) => {
    queryClient.invalidateQueries({ queryKey: [`${keyName}`] });
  };

  const likePost = async (postId: string) => {
    try {
      setIsUpdating(true);
      setPosts((prev) => {
        return prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isLiked: true,
              likeCount: post.likeCount ? post.likeCount + 1 : 1,
            };
          }
          return post;
        });
      });
      await GraphQL.request(likePostMutation, { postId });
      updatePost(key);
    } catch (error) {
      toast.error('Something went wrong');
      setPosts((prev) => {
        return prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isLiked: false,
              likeCount: post.likeCount ? post.likeCount - 1 : 0,
            };
          }
          return post;
        });
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const unlikePost = async (postId: string) => {
    try {
      setIsUpdating(true);
      setPosts((prev) => {
        return prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isLiked: false,
              likeCount: post.likeCount ? post.likeCount - 1 : 0,
            };
          }
          return post;
        });
      });
      await GraphQL.request(unlikePostMutation, { postId });
      updatePost(key);
    } catch (error) {
      toast.error('Something went wrong');
      setPosts((prev) => {
        return prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isLiked: true,
              likeCount: post.likeCount ? post.likeCount + 1 : 1,
            };
          }
          return post;
        });
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return { isUpdating, postFn: { likePost, unlikePost }, posts, updatePost };
};
