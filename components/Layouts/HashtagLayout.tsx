'use client';

import { HashtagLayoutProps } from '@/utils/interfaces';
import React from 'react';
import Sidebar from '../Sidebar';
import { GraphQL } from '@/client/api';
import { getUserGoogleToken } from '@/graphql/query/user';
import { useGetUser } from '@/hooks/user';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import RecommendedUser from '../RecommendedUser/RecommendedUser';

const HashtagLayout: React.FC<HashtagLayoutProps> = (props) => {
  const { user } = useGetUser();

  const queryClient = useQueryClient();

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
    <main className="grid sm:grid-cols-[1fr_100%] lg:grid-cols-[1fr_600px_1fr] grid-rows-1 h-screen container w-full">
      <section className="py-4 transition-all relative justify-self-end hidden sm:block">
        <Sidebar user={user} />
      </section>
      <section className="hide-scrollbar sm:border-l-[1px] sm:border-r-[1px] sm:border-gray-500 overflow-y-scroll max-w-[600px]">
        {props.children}
      </section>
      <section className="p-5 hidden lg:block">
        {!user?.id ? (
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
        ) : (
          <RecommendedUser loggedInUser={user} />
        )}
      </section>
    </main>
  );
};

export default HashtagLayout;
