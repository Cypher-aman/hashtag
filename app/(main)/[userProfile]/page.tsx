'use client';

import { GoArrowLeft } from 'react-icons/go';
import Image from 'next/image';
import UserCoverPlaceholder from '@/assets/images/twitter-cover.jpg';
import UserProfilePlaceholder from '@/assets/images/user-avatar.jpg';
import React, { useCallback, useState } from 'react';
import { ExtendedUser, UserPostsFilterMenu } from '@/utils/interfaces';
import { usePostContext, useUserPosts } from '@/hooks/post';
import PostCard from '@/components/PostCard';
import { Post, User } from '@/gql/graphql';
import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import {
  useCurrentUserContext,
  useLikedPosts,
  useLoggedInUserContext,
  usePostsWithMedia,
} from '@/hooks/user';
import { useRouter } from 'next/navigation';
import ProfileAction from '@/components/ProfileAction';
import { CiCamera } from 'react-icons/ci';
import toast from 'react-hot-toast';
import { GraphQL } from '@/client/api';
import { getPresignerURLQuery } from '@/graphql/query/post';
import axios from 'axios';
import { updateProfileMutation } from '@/graphql/mutation/user';
import { useQueryClient } from '@tanstack/react-query';
import EditProfile from '@/components/EditProfile/editProfile';

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

interface UserPosts {
  posts: Post[];
  status: 'pending' | 'success' | 'error';
}

const UserProfilePage = ({ params }: { params: { userProfile: string } }) => {
  const { userProfile: userName } = params;
  const [selectedFilter, setSelectedFilter] = useState('posts');
  const { status, user: currentUser } = useCurrentUserContext();
  const { user: loggedInUser } = useLoggedInUserContext();
  const allPosts = useUserPosts(userName, currentUser?.id);
  // const queryClient = useQueryClient();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleImageUpload = useCallback(
    async (file: File) => {
      try {
        toast.loading('Uploading image...', { id: '2' });
        const { getPresignerURL } = await GraphQL.request(
          getPresignerURLQuery,
          {
            imageType: file.type,
            imageName: file.name,
          }
        );

        if (!getPresignerURL) throw new Error('Failed to upload image');

        await axios.put(getPresignerURL, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
        toast.success('Image uploaded successfully', { id: '2' });
        const imageUrl = getPresignerURL.split('?')[0];

        await GraphQL.request(updateProfileMutation, {
          payload: {
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            userName: currentUser?.userName,
            profilePicUrl: imageUrl,
          },
        });

        await queryClient.invalidateQueries({ queryKey: ['user_by_name'] });
      } catch (error) {
        toast.error('Failed to upload image', { id: '2' });
      }
    },
    [
      currentUser?.firstName,
      currentUser?.lastName,
      currentUser?.userName,
      queryClient,
    ]
  );

  const handleCoverUpload = useCallback(
    async (file: File) => {
      try {
        toast.loading('Uploading image...', { id: '2' });
        const { getPresignerURL } = await GraphQL.request(
          getPresignerURLQuery,
          {
            imageType: file.type,
            imageName: file.name,
          }
        );

        if (!getPresignerURL) throw new Error('Failed to upload image');

        await axios.put(getPresignerURL, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
        toast.success('Image uploaded successfully', { id: '2' });
        const imageUrl = getPresignerURL.split('?')[0];

        await GraphQL.request(updateProfileMutation, {
          payload: {
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            userName: currentUser?.userName,
            profilePicUrl: currentUser?.profilePicUrl,
            coverPicUrl: imageUrl,
          },
        });

        await queryClient.invalidateQueries({ queryKey: ['user_by_name'] });
      } catch (error) {
        toast.error('Failed to upload image', { id: '2' });
      }
    },
    [
      currentUser?.firstName,
      currentUser?.lastName,
      currentUser?.profilePicUrl,
      currentUser?.userName,
      queryClient,
    ]
  );

  const handleImageSubmit = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute(
      'accept',
      'image/png, image/jpeg, image/jpg, image/webp'
    );

    input.addEventListener('change', (e) => {
      e.preventDefault();
      const selectedFile = (input as HTMLInputElement).files?.[0];
      if (!selectedFile) return;
      handleImageUpload(selectedFile);
    });
    input.click();
  }, [handleImageUpload]);

  const handleCoverSubmit = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute(
      'accept',
      'image/png, image/jpeg, image/jpg, image/webp'
    );

    input.addEventListener('change', (e) => {
      e.preventDefault();
      const selectedFile = (input as HTMLInputElement).files?.[0];
      if (!selectedFile) return;
      handleCoverUpload(selectedFile);
    });
    input.click();
  }, [handleImageUpload]);

  const handleFilterChange = (key: string) => {
    if (selectedFilter === key) return;
    setSelectedFilter(key);
  };

  return (
    <React.Fragment>
      <div className="flex gap-6 max-w-[600px] p-3 items-center h-[60px] sticky top-0 w-full backdrop-blur-xl z-50">
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
          {allPosts.status === 'pending' ? (
            <span className="animate-pulse w-[50px] rounded-full h-2 block bg-gray-600"></span>
          ) : (
            <span className="text-sm text-gray-500">
              {allPosts?.posts?.length} posts
            </span>
          )}
        </div>
      </div>
      <div className="w-full relative">
        <div className="w-full group cursor-pointer max-w-[600px] max-h-[200px] aspect-w-3 aspect-h-1 relative overflow-hidden z-20">
          <Image
            src={currentUser?.coverPicUrl || UserCoverPlaceholder}
            alt="cover"
            width={600}
            height={200}
            className="w-full h-full object-cover"
          />
          {currentUser?.userName === loggedInUser?.userName && (
            <div
              onClick={handleCoverSubmit}
              className="absolute hidden group-hover:flex top-0 bottom-0 right-0 left-0  z-20 text-5xl hover:drop-shadow-xl backdrop-blur-sm justify-center items-center"
            >
              <CiCamera />
            </div>
          )}
        </div>

        <div className="w-[calc(10%+40px)] h-auto max-w-[130px] max-h-[130px] absolute z-30 left-4  -translate-y-1/2">
          {status === 'pending' ? (
            <span className="border-4 border-black w-[100px] h-[100px] rounded-full block bg-gray-600"></span>
          ) : (
            <div className="relative group cursor-pointer">
              <Image
                src={currentUser?.profilePicUrl || UserProfilePlaceholder}
                className="rounded-full object-cover border-4 border-black"
                alt="cover"
                width={150}
                height={150}
              />

              {currentUser?.userName === loggedInUser?.userName && (
                <div
                  onClick={handleImageSubmit}
                  className="absolute hidden group-hover:block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl hover:drop-shadow-xl"
                >
                  <CiCamera />
                </div>
              )}
            </div>
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
        <p className="text-sm text-[#e7e9ea]">{currentUser?.bio || 'No bio'}</p>
      </div>
      <div className="py-6 px-4">
        <span
          onClick={() => router.push(`/${userName}/details?q=followers`)}
          className="font-semibold text-[#e7e9ea] mr-5 hover:underline cursor-pointer"
        >
          {currentUser?.follower?.length}{' '}
          <span className="text-[#71767b] font-light">Followers</span>
        </span>
        <span
          onClick={() => router.push(`/${userName}/details?q=following`)}
          className="font-semibold text-[#e7e9ea] hover:underline cursor-pointer"
        >
          {currentUser?.following?.length}{' '}
          <span className="text-[#71767b] font-light">Following</span>
        </span>
      </div>
      <div className="py-6">
        <div className="flex justify-around border-b border-[#536471]">
          {PostFilters.map((filter) => (
            <div
              key={filter.key}
              className="hover:bg-[#e7e9ea1a] w-full py-4 text-center cursor-pointer"
              onClick={() => handleFilterChange(filter.key)}
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
            <UserPostsFeed posts={allPosts.posts} status={allPosts.status} />
          )}
          {selectedFilter === 'media' && (
            <UserPostWithMedia userId={currentUser?.id} />
          )}
          {selectedFilter === 'likes' && (
            <UserLikedPosts userId={currentUser?.id} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const UserPostsFeed: React.FC<UserPosts> = (props) => {
  const { posts: fetchedPosts, status } = props;
  const keyName = 'user_posts';
  console.log('fetchedPosts', fetchedPosts);
  const { isUpdating, postFn, posts } = usePostContext(keyName, fetchedPosts);
  if (status === 'pending') {
    return (
      <div className="py-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!fetchedPosts) {
    return (
      <div className="py-8">
        <p className="text-center text-[#e7e9ea]">No posts to show!</p>
      </div>
    );
  }

  return (
    <div>
      {posts?.map((post) => (
        <PostCard
          key={post?.id}
          post={post as Post}
          postFn={postFn}
          isUpdating={isUpdating}
          keyName={keyName}
        />
      ))}
    </div>
  );
};

const UserPostWithMedia = ({ userId }: { userId: string }) => {
  const { status, posts: postWithMedia } = usePostsWithMedia(userId);
  console.log('fetchedPosts', postWithMedia);

  const keyName = 'posts_with_media';

  const { isUpdating, postFn, posts } = usePostContext(
    keyName,
    postWithMedia as Post[]
  );
  if (status === 'pending') {
    return (
      <div className="py-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!postWithMedia) {
    return (
      <div className="py-8">
        <p className="text-center text-[#e7e9ea]">No posts to show!</p>
      </div>
    );
  }

  return (
    <div>
      {posts?.map((post) => (
        <PostCard
          key={post?.id}
          post={post as Post}
          postFn={postFn}
          isUpdating={isUpdating}
          keyName={keyName}
        />
      ))}
    </div>
  );
};

const UserLikedPosts = ({ userId }: { userId: string }) => {
  const { status, likedPosts } = useLikedPosts(userId);
  console.log('likedPosts', likedPosts);

  const keyName = 'liked_posts';
  const { isUpdating, postFn, posts } = usePostContext(
    keyName,
    likedPosts as Post[]
  );

  if (status === 'pending') {
    return (
      <div className="py-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!likedPosts) {
    return (
      <div className="py-8">
        <p className="text-center text-[#e7e9ea]">No posts to show!</p>
      </div>
    );
  }

  return (
    <div>
      {posts?.map((post) => (
        <PostCard
          key={post?.id}
          post={post as Post}
          postFn={postFn}
          isUpdating={isUpdating}
          keyName={keyName}
        />
      ))}
    </div>
  );
};

export default UserProfilePage;
