'use client';

import React, { useCallback, useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';
import { useLoggedInUserContext } from '@/hooks/user';
import { PostInterface } from '@/utils/interfaces';
import { useCreatePost, useGetAllPosts, usePostContext } from '@/hooks/post';
import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import CreatePost from '@/components/CreatePost/createPost';
import Error from '@/components/Error/error';
import { FaHashtag } from 'react-icons/fa6';

import { Post, User } from '@/gql/graphql';
import SideScreenMenu from '@/components/Modals/SideScreenMenu';
import CreatePostModal from '@/components/Modals/CreatePostModal';

export default function Home() {
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
}

const PostFeed = () => {
  const keyName = 'posts';
  const [post, setPost] = useState<Post[] | []>([]);
  // const []

  useEffect(() => {}, []);

  const { status, posts: postArr } = useGetAllPosts();
  const { isUpdating, postFn, posts, updatePost } = usePostContext(
    keyName,
    postArr as Post[]
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
      <div className="fixed right-2 bottom-5 block sm:hidden">
        <CreatePostModal />
      </div>
    </React.Fragment>
  );
};

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
