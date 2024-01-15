'use client';

import React, { useCallback, useEffect } from 'react';
import PostCard from '@/components/PostCard';
import { useLoggedInUserContext } from '@/hooks/user';
import { PostInterface } from '@/utils/interfaces';
import {
  useCreatePost,
  useGetAllPosts,
  usePostContext,
  usePostContextExp,
} from '@/hooks/post';
import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import CreatePost from '@/components/CreatePost/createPost';
import Error from '@/components/Error/error';
import { FaHashtag } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';
import { Post, User } from '@/gql/graphql';
import SideScreenMenu from '@/components/Modals/SideScreenMenu';
import CreatePostModal from '@/components/Modals/CreatePostModal';

interface getAllPostsInterface {
  posts: Post[];
  nextId: string;
}
interface PagesInterface {
  getAllPosts: getAllPostsInterface;
}

const Home = () => {
  const { status, user } = useLoggedInUserContext();

  const { mutate } = useCreatePost();
  const [postContent, setPostContent] = React.useState<PostInterface>({
    content: '',
    imageUrl: '',
  });

  const handlePostSubmit = useCallback(async () => {
    if (!postContent.content) return;
    mutate(postContent);
    setPostContent({
      content: '',
      imageUrl: '',
    });
  }, [postContent, mutate]);

  if (status === 'pending')
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  if (status === 'error') return <Error />;

  return (
    <React.Fragment>
      <SmallScreenHeader user={user} />
      <div className="hidden sm:block">
        <CreatePost
          postContent={postContent}
          setPostContent={setPostContent}
          handlePostSubmit={handlePostSubmit}
        />
      </div>
      <PostFeed />
    </React.Fragment>
  );
};

const PostFeed = React.memo(() => {
  const keyName = 'posts';
  const { ref, inView } = useInView();
  const {
    status,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetAllPosts();
  // const [postArr, setPostArr] = React.useState<Post[]>([]);

  // useEffect(() => {
  //   setPostArr([]);
  //   data?.pages.forEach((page) => {
  //     setPostArr((prev) => [...prev, ...(page.getAllPosts?.posts as Post[])]);
  //   });
  // }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const { isUpdating, postFn, posts, updatePost } = usePostContextExp(
    keyName,
    data?.pages as PagesInterface[]
  );

  if (status === 'pending') {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'success' && !posts?.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-500">No posts yet</p>
      </div>
    );
  }
  return (
    <React.Fragment>
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post as Post}
          postFn={postFn}
          isUpdating={isUpdating}
          keyName="posts"
        />
      ))}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4 items-center">
          <LoadingSpinner />
        </div>
      )}
      <div className="h-6 w-full" ref={ref}></div>
      <div className="fixed right-2 bottom-5 block sm:hidden">
        <CreatePostModal />
      </div>
    </React.Fragment>
  );
});

const SmallScreenHeader = ({ user }: { user: User }) => {
  return (
    <nav className="sticky top-0 border-b border-[#2f3336] block sm:hidden">
      <div className="w-full relative h-[50px] backdrop-blur-3xl flex justify-center items-center">
        <SideScreenMenu user={user} />
        <div className="text-2xl">
          <FaHashtag className="rotate-12" />
        </div>
      </div>
    </nav>
  );
};

PostFeed.displayName = 'PostFeed';
SmallScreenHeader.displayName = 'SmallScreenHeader';
Home.displayName = 'Home';
export default Home;
