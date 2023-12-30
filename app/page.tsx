'use client';

import { FaHashtag, FaRegUser } from 'react-icons/fa6';
import { BiSolidHome } from 'react-icons/bi';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoBookmarkOutline,
} from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';
import FeedCard from '@/components/FeedCard';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { GraphQL } from '@/client/api';
import { getUserGoogleToken } from '@/graphql/query/user';
import { useGetUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { PostInterface, SidebarMenuInterface } from '@/utils/interfaces';
import { useCreatePost, useGetAllPosts } from '@/hooks/post';
import { Post } from '@/gql/graphql';

const sideBarMenuButtons: SidebarMenuInterface[] = [
  {
    title: 'Home',
    icon: <BiSolidHome />,
  },
  {
    title: 'Explore',
    icon: <IoSearchOutline />,
  },
  {
    title: 'Notifications',
    icon: <IoNotificationsOutline />,
  },
  {
    title: 'Messages',
    icon: <HiOutlineEnvelope />,
  },
  {
    title: 'Bookmarks',
    icon: <IoBookmarkOutline />,
  },
  {
    title: 'Profile',
    icon: <FaRegUser />,
  },
];

export default function Home() {
  const pathName = usePathname();
  const { user } = useGetUser();
  const queryClient = useQueryClient();
  const [postContent, setPostContent] = React.useState<PostInterface>({
    content: '',
    imageUrl: '',
  });
  const { posts = [] } = useGetAllPosts();
  const { mutate } = useCreatePost();

  const handlePostSubmit = useCallback(async () => {
    if (!postContent.content) return;
    mutate(postContent);
    setPostContent({ content: '', imageUrl: '' });
  }, [postContent, mutate]);

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;

    if (!token) return toast.error('Something went wrong');

    try {
      const { verifyGoogleToken } = await GraphQL.request(getUserGoogleToken, {
        token,
      });

      window.localStorage.setItem('__hashtag_token', verifyGoogleToken);
      await queryClient.invalidateQueries({ queryKey: ['user_info'] });
      toast.success('Logged in successfully');
    } catch (error: any) {
      console.log(error.message);
      toast.error('Something went wrong');
    }
  };
  return (
    <main className="grid grid-cols-[1fr_2fr_1fr] grid-rows-1 h-screen container">
      <section className="py-4 transition-all relative">
        <div className="text-3xl p-2 ml-2 hover:bg-gray-700 rounded-full w-fit cursor-pointer">
          <FaHashtag className="rotate-12" />
        </div>
        <div className="mt-5">
          <ul>
            {sideBarMenuButtons.map((el, index) => {
              return (
                <li
                  key={index}
                  className="mb-2 p-2 px-4 w-fit rounded-full flex gap-4 items-center cursor-pointer hover:bg-gray-700"
                >
                  <span className="text-2xl">{el.icon}</span>
                  <span
                    className={`${index === 0 ? 'font-semibold' : ''} text-xl`}
                  >
                    {el.title}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="px-2 pr-6">
            {' '}
            <button className="text-xl rounded-full bg-purple-600 hover:bg-purple-500 cursor-pointer py-3 mt-5 w-full">
              Post
            </button>
          </div>
        </div>
        {user && (
          <div className="flex absolute bottom-5 items-center w-fit gap-2 py-2 px-3 hover:bg-[#e7e9ea1a] rounded-full">
            {user.profilePicUrl && (
              <Image
                className="rounded-full"
                alt="user-image"
                src={user.profilePicUrl}
                height={40}
                width={40}
              />
            )}
            <div>
              {' '}
              <p className="text-base font-semibold hover:underline cursor-pointer">
                {user.firstName + ' ' + (user.lastName || '')}
              </p>
              <p className="text-gray-400 text-sm">@{user.userName}</p>
            </div>
          </div>
        )}
      </section>
      <section className="hide-scrollbar border-l-[1px] border-r-[1px] border-gray-500 overflow-y-scroll">
        <div className="">
          <div className="flex justify-start p-4 gap-2">
            <div className="w-[40px]">
              {user?.profilePicUrl && (
                <Image
                  className="rounded-full"
                  alt="user-image"
                  src={user.profilePicUrl}
                  height={40}
                  width={40}
                />
              )}
            </div>

            <div className="w-full px-2">
              <textarea
                className="w-full bg-transparent focus:outline-none border-b-[1px] border-gray-700 resize-none"
                placeholder="What's happening?"
                rows={3}
                value={postContent.content}
                onChange={(e) => {
                  setPostContent({ ...postContent, content: e.target.value });
                }}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handlePostSubmit}
                  disabled={!postContent.content}
                  className="text-base rounded-full bg-purple-600 hover:bg-purple-500 cursor-pointer px-6 py-2 w-fit disabled:cursor-not-allowed disabled:bg-purple-400 disabled:hover:bg-purple-400 "
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        {posts &&
          posts?.map((post) => <FeedCard key={post?.id} {...(post as Post)} />)}
      </section>
      <section className="p-5">
        {!user?.id && (
          <div className="p-4 w-full border-[1px] border-gray-500 rounded">
            <h5 className="font-bold">New To Hashtag?</h5>
            <p className="text-gray-400 text-xs mb-4">
              Sign up with Google to get started.
            </p>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        )}
      </section>
    </main>
  );
}
