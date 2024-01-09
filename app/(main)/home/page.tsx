'use client';

import React, { useCallback } from 'react';
import PostCard from '@/components/FeedCard';
import { useLoggedInUserContext } from '@/hooks/user';
import { PostInterface } from '@/utils/interfaces';
import { useCreatePost, useGetAllPosts, usePostContext } from '@/hooks/post';
import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import CreatePost from '@/components/CreatePost/createPost';
import Error from '@/components/Error/error';
import { Post } from '@/gql/graphql';

export default function Home() {
  const { status } = useLoggedInUserContext();

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
      <CreatePost
        postContent={postContent}
        setPostContent={setPostContent}
        handlePostSubmit={handlePostSubmit}
      />
      <PostFeed />
    </React.Fragment>
  );
}

const PostFeed = () => {
  const keyName = 'posts';

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
          updatePost={() => updatePost('posts')}
        />
      ))}
    </React.Fragment>
  );
};
