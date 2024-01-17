'use client';

import { HashtagLayoutProps } from '@/utils/interfaces';
import React from 'react';
import Sidebar from '../Sidebar';
import { useGetUser } from '@/hooks/user';
import RecommendedUser from '../RecommendedUser/RecommendedUser';
import SmallScreenHeader from '../Sidebar/smallScreenSIdebar';
import { User } from '@/gql/graphql';

const HashtagLayout: React.FC<HashtagLayoutProps> = (props) => {
  const { user } = useGetUser();

  return (
    <main className="grid sm:grid-cols-[1fr_100%] lg:grid-cols-[1fr_600px_1fr] grid-rows-1 h-screen container w-full">
      <section className="py-4 transition-all relative justify-self-end hidden sm:block">
        <Sidebar user={user} />
      </section>
      <section className="hide-scrollbar sm:border-l-[1px] sm:border-r-[1px] sm:border-gray-500 overflow-y-scroll max-w-[600px]">
        <SmallScreenHeader user={user as User} />
        {props.children}
      </section>
      <section className="p-5 hidden lg:block">
        <RecommendedUser loggedInUser={user!} />
      </section>
    </main>
  );
};

export default HashtagLayout;
