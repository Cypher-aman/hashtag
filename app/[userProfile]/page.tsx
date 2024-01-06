'use client';

import { GoArrowLeft } from 'react-icons/go';
import Image from 'next/image';
import UserCoverPlaceholder from '@/assets/images/twitter-cover.jpg';
import UserProfilePlaceholder from '@/assets/images/user-avatar.jpg';
import React, { useState } from 'react';
import { ExtendedUser, UserPostsFilterMenu } from '@/utils/interfaces';
import { useUserPosts } from '@/hooks/post';
import FeedCard from '@/components/FeedCard';
import { Maybe, Post, User } from '@/gql/graphql';
import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import { useCurrentUserContext, useGetUser, useUserByName } from '@/hooks/user';
import { useRouter } from 'next/navigation';
import ProfileAction from '@/components/ProfileAction';
import { useQueryClient } from '@tanstack/react-query';

const PostFilters: UserPostsFilterMenu[] = [
  {
    name: 'Posts',
    key: 'posts',
  },
  {
    name: 'Media',
    key: 'media',
  },
  {
    name: 'Likes',
    key: 'likes',
  },
];

const UserProfilePage = ({ params }: { params: { userProfile: string } }) => {
  const { userProfile: userName } = params;
  const [selectedFilter, setSelectedFilter] = useState('posts');
  const { status, user: currentUser } = useCurrentUserContext();
  const { user: loggedInUser } = useGetUser();
  // const queryClient = useQueryClient();
  const router = useRouter();

  if (!currentUser) return null;
  return (
    <React.Fragment>
      <div className="flex gap-6 max-w-[600px] p-3 items-center h-[60px] sticky top-0 w-full backdrop-blur-xl z-20">
        <button
          onClick={() => router.back()}
          className="text-[25px] p-3 hover:bg-[#e7e9ea1a] rounded-full"
        >
          <GoArrowLeft />
        </button>
        <div>
          {status === 'pending' ? (
            <span className="animate-pulse mb-2 w-[100px] rounded-full h-2 block bg-gray-600"></span>
          ) : (
            <h1 className="text-[20px] font-semibold leading-6">
              {currentUser?.firstName} {currentUser?.lastName}
            </h1>
          )}
          {status === 'pending' ? (
            <span className="animate-pulse w-[50px] rounded-full h-2 block bg-gray-600"></span>
          ) : (
            <span className="text-sm text-gray-500">100 posts</span>
          )}
        </div>
      </div>
      <div className="w-full relative">
        <div className="w-full max-w-[600px] max-h-[200px] aspect-w-3 aspect-h-1 relative overflow-hidden">
          <Image
            src={UserCoverPlaceholder}
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-[calc(10%+40px)] h-auto max-w-[130px] max-h-[130px] absolute z-10 left-4  -translate-y-1/2">
          {status === 'pending' ? (
            <span className="border-4 border-black w-[100px] h-[100px] rounded-full block bg-gray-600"></span>
          ) : (
            <Image
              src={currentUser?.profilePicUrl || UserProfilePlaceholder}
              className="rounded-full object-cover border-4 border-black"
              alt="cover"
              width={130}
              height={130}
            />
          )}
        </div>
      </div>
      <div className="text-right p-4">
        <ProfileAction
          currentUser={currentUser as ExtendedUser}
          loggedInUser={loggedInUser}
        />
      </div>
      <div className="px-4">
        {status === 'pending' ? (
          <span className="animate-pulse w-[100px] mb-2 rounded-full h-2 block bg-gray-600"></span>
        ) : (
          <h2 className="text-[18px] font-semibold leading-6">
            {currentUser?.firstName} {currentUser?.lastName}
          </h2>
        )}
        {status === 'pending' ? (
          <span className="animate-pulse w-[70px] rounded-full h-2 block mb-4 bg-gray-600"></span>
        ) : (
          <p className=" text-gray-500 mb-4">@{currentUser?.userName}</p>
        )}
        <p className="text-sm text-[#e7e9ea]">Bio</p>
      </div>
      <div className="py-6 px-4">
        <span
          onClick={() => router.push(`/${userName}/details`)}
          className="font-semibold text-[#e7e9ea] mr-5 hover:underline cursor-pointer"
        >
          {currentUser.follower?.length}{' '}
          <span className="text-[#71767b] font-light">Followers</span>
        </span>
        <span
          onClick={() => router.push(`/${userName}/details`)}
          className="font-semibold text-[#e7e9ea] hover:underline cursor-pointer"
        >
          {currentUser.following?.length}{' '}
          <span className="text-[#71767b] font-light">Following</span>
        </span>
      </div>
      <div className="py-6">
        <div className="flex justify-around border-b border-[#536471]">
          {PostFilters.map((filter) => (
            <div
              key={filter.key}
              className="hover:bg-[#e7e9ea1a] w-full py-4 text-center cursor-pointer"
            >
              {selectedFilter === filter.key ? (
                <button className="after:content-[''] after:-bottom-4 after:rounded-full after:left-0 after:w-full after:h-1 after:bg-purple-600 after:absolute relative">
                  {filter.name}
                </button>
              ) : (
                <button className="text-[#71767b]">{filter.name}</button>
              )}
            </div>
          ))}
        </div>
        <div>
          {selectedFilter === 'posts' && (
            <UserPostsFeed userName={userName} userId={currentUser?.id} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const UserPostsFeed = (props: any) => {
  const { userName, userId } = props;
  const allPosts = useUserPosts(userName, userId);
  if (allPosts.status === 'pending' || allPosts.isFetching) {
    return (
      <div className="py-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!allPosts.posts) {
    return (
      <div className="py-8">
        <p className="text-center text-[#e7e9ea]">No posts to show!</p>
      </div>
    );
  }

  return (
    <div>
      {allPosts.posts.map(
        (post: {
          id: any;
          __typename?: 'Post' | undefined;
          author?: User;
          authorId?: string;
          content?: string;
          createdAt?: any;
          imageUrl?: Maybe<string> | undefined;
          updatedAt?: any;
        }) => (
          <FeedCard key={post?.id} {...(post as Post)} />
        )
      )}
    </div>
  );
};

export default UserProfilePage;
