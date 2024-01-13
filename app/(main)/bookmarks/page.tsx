'use client';

import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import { Post } from '@/gql/graphql';
import { usePostContext } from '@/hooks/post';
import { useBookmarkedPosts } from '@/hooks/user';
import React from 'react';

const BookmarkPage = () => {
  const { status, bookmarkedPosts } = useBookmarkedPosts();
  const { isUpdating, postFn, posts, updatePost } = usePostContext(
    'bookmarked_posts',
    bookmarkedPosts as Post[]
  );

  if (status === 'pending') {
    return (
      <main>
        <h1 className="text-2xl py-6 px-3 font-semibold border-b border-[#2f3336]">
          Bookmarks
        </h1>
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      </main>
    );
  }

  if (bookmarkedPosts?.length === 0) {
    return (
      <main>
        <h1 className="text-2xl py-6 px-3 font-semibold border-b border-[#2f3336]">
          Bookmarks
        </h1>
        <div className="flex justify-center items-center h-screen">
          No Bookmarks
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1 className="text-2xl py-6 px-3 font-semibold border-b border-[#2f3336]">
        Bookmarks
      </h1>
      <section className="w-full">
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            postFn={postFn}
            isUpdating={isUpdating}
            keyName="bookmarked_posts"
          />
        ))}
      </section>
    </main>
  );
};

export default BookmarkPage;
