import { GraphQL } from '@/client/api';
import { CreatePostInput, CreateReplyInput, Post } from '@/gql/graphql';
import {
  bookmarkPostMutation,
  createPostMutation,
  createReplyMutation,
  likePostMutation,
  unBookmarkPostMutation,
  unlikePostMutation,
} from '@/graphql/mutation/post';
import { getAllPostsQuery, getRepliesToPostQuery } from '@/graphql/query/post';
import { getUserPostsQuery } from '@/graphql/query/post';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export const useGetAllPosts = () => {
  const {
    status,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    ...query
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = '' }) =>
      await GraphQL.request(getAllPostsQuery, { cursor: pageParam }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.getAllPosts?.nextId,
  });
  // console.log('query', query.data?.pages);
  return {
    status,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    ...query,
  };
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

  return { status, isFetching, posts: data?.getUserPosts as Post[] };
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
      await queryClient.invalidateQueries({ queryKey: ['post_details'] });
    },
    onError: () => {
      toast.error('Failed to reply', { id: '3' });
    },
  });

  return mutation;
};

export const usePostDetails = (postId: string) => {
  const { status, data } = useQuery({
    queryKey: ['post_details'],
    queryFn: async () =>
      await GraphQL.request(getRepliesToPostQuery, { postId }),
  });

  return { status, post: data?.getRepliesToPost };
};

export const usePostContext = (key: string, postArr: Post[]) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();
  const [posts, setPosts] = useState<Post[]>(postArr);

  useEffect(() => {
    setPosts((prev) => postArr);
  }, [postArr]);

  const updatePost = (keyName: string) => {
    queryClient.invalidateQueries({ queryKey: [`${keyName}`] });
  };

  const likePost = useCallback(async (postId: string) => {
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
  }, []);

  const unlikePost = useCallback(async (postId: string) => {
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
  }, []);

  const bookmarkPost = useCallback(async (postId: string) => {
    try {
      setIsUpdating(true);
      setPosts((prev) => {
        return prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isBookmarked: true,
              bookmarkCount: post.bookmarkCount ? post.bookmarkCount + 1 : 1,
            };
          }
          return post;
        });
      });
      await GraphQL.request(bookmarkPostMutation, { postId });
      updatePost(key);
    } catch (error) {
      toast.error('Something went wrong');
      setPosts((prev) => {
        return prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isBookmarked: false,
              bookmarkCount: post.bookmarkCount ? post.bookmarkCount - 1 : 0,
            };
          }
          return post;
        });
      });
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const unBookmarkPost = useCallback(async (postId: string) => {
    try {
      setIsUpdating(true);
      setPosts((prev) => {
        return prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isBookmarked: false,
              bookmarkCount: post.bookmarkCount ? post.bookmarkCount - 1 : 0,
            };
          }
          return post;
        });
      });
      await GraphQL.request(unBookmarkPostMutation, { postId });
      updatePost(key);
    } catch (error) {
      toast.error('Something went wrong');
      setPosts((prev) => {
        return prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isBookmarked: true,
              bookmarkCount: post.bookmarkCount ? post.bookmarkCount + 1 : 1,
            };
          }
          return post;
        });
      });
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    isUpdating,
    postFn: { likePost, unlikePost, bookmarkPost, unBookmarkPost },
    posts,
    updatePost,
  };
};

export const usePostUpadate = (data: Post) => {
  const [post, setPost] = useState<Post>(data);
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setPost(data);
  }, [data]);

  const updatePost = async () => {
    await queryClient.invalidateQueries({ queryKey: [post.id] });
  };

  const likePost = async () => {
    try {
      setIsUpdating(true);
      setPost((prev) => {
        return {
          ...prev,
          isLiked: true,
          likeCount: prev.likeCount ? prev.likeCount + 1 : 1,
        };
      });
      await GraphQL.request(likePostMutation, { postId: post.id });
      updatePost();
      setIsUpdating(false);
    } catch (error) {
      toast.error('Something went wrong');
      setPost((prev) => {
        return {
          ...prev,
          isLiked: false,
          likeCount: prev.likeCount ? prev.likeCount - 1 : 0,
        };
      });
      setIsUpdating(false);
    }
  };

  const unlikePost = async () => {
    try {
      setIsUpdating(true);
      setPost((prev) => {
        return {
          ...prev,
          isLiked: false,
          likeCount: prev.likeCount ? prev.likeCount - 1 : 0,
        };
      });
      await GraphQL.request(unlikePostMutation, { postId: post.id });
      updatePost();
      setIsUpdating(false);
    } catch (error) {
      toast.error('Something went wrong');
      setPost((prev) => {
        return {
          ...prev,
          isLiked: true,
          likeCount: prev.likeCount ? prev.likeCount + 1 : 1,
        };
      });
      setIsUpdating(false);
    }
  };

  const postFn = {
    likePost,
    unlikePost,
    updatePost,
  };

  return { postFn, post, isUpdating };
};

interface getAllPostsInterface {
  posts: Post[];
  nextId: string;
}
interface PagesInterface {
  getAllPosts: getAllPostsInterface;
}

export const usePostContextExp = (key: string, pages: PagesInterface[]) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const postArr = pages?.map((page) => page?.getAllPosts.posts).flat();
    setPosts(postArr);
  }, [pages]);

  // console.log('inside-hook', isFetching);

  const updatePost = (keyName: string) => {
    queryClient.invalidateQueries({ queryKey: [`${keyName}`] });
  };

  const likePost = useCallback(async (postId: string) => {
    try {
      setIsUpdating(true);
      setPosts((prev) => {
        return prev?.map((post) => {
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
        return prev?.map((post) => {
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
  }, []);

  const unlikePost = useCallback(async (postId: string) => {
    try {
      setIsUpdating(true);
      setPosts((prev) => {
        return prev?.map((post) => {
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
        return prev?.map((post) => {
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
  }, []);

  const bookmarkPost = useCallback(async (postId: string) => {
    try {
      setIsUpdating(true);
      setPosts((prev) => {
        return prev?.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isBookmarked: true,
              bookmarkCount: post.bookmarkCount ? post.bookmarkCount + 1 : 1,
            };
          }
          return post;
        });
      });
      await GraphQL.request(bookmarkPostMutation, { postId });
      updatePost(key);
    } catch (error) {
      toast.error('Something went wrong');
      setPosts((prev) => {
        return prev?.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isBookmarked: false,
              bookmarkCount: post.bookmarkCount ? post.bookmarkCount - 1 : 0,
            };
          }
          return post;
        });
      });
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const unBookmarkPost = useCallback(async (postId: string) => {
    try {
      setIsUpdating(true);
      setPosts((prev) => {
        return prev?.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isBookmarked: false,
              bookmarkCount: post.bookmarkCount ? post.bookmarkCount - 1 : 0,
            };
          }
          return post;
        });
      });
      await GraphQL.request(unBookmarkPostMutation, { postId });
      updatePost(key);
    } catch (error) {
      toast.error('Something went wrong');
      setPosts((prev) => {
        return prev?.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isBookmarked: true,
              bookmarkCount: post.bookmarkCount ? post.bookmarkCount + 1 : 1,
            };
          }
          return post;
        });
      });
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    isUpdating,
    postFn: { likePost, unlikePost, bookmarkPost, unBookmarkPost },
    posts,
    updatePost,
  };
};
