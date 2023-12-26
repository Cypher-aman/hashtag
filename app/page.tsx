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
import React from 'react';
import FeedCard from '@/components/FeedCard';

interface SidebarMenuInterface {
  title: string;
  icon: React.ReactNode;
}

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
  return (
    <main className="grid grid-cols-[1fr_2fr_1fr] grid-rows-1 h-screen container">
      <section className="py-4 transition-all">
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
      </section>
      <section className="hide-scrollbar border-l-[1px] border-r-[1px] border-gray-500 overflow-y-scroll">
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </section>
      <section className=""></section>
    </main>
  );
}
