'use client';

import { SidebarMenuInterface, SidebarProps } from '@/utils/interfaces';
import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { FaHashtag, FaRegUser } from 'react-icons/fa6';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import {
  IoBookmarkOutline,
  IoNotificationsOutline,
  IoSearchOutline,
} from 'react-icons/io5';
import Image from 'next/image';
import { CreatePostModal } from '../Modals/CreatePostModal';

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

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { user } = props;
  return (
    <div className="flex flex-col w-full items-end xl:items-start   lg:pr-6">
      <div className="text-3xl mr-4 lg:mr-0 ml-2 p-2 hover:bg-gray-700 rounded-full w-fit cursor-pointer">
        <FaHashtag className="rotate-12" />
      </div>
      <div className="mt-5 mr-5 lg:mr-0">
        <ul>
          {sideBarMenuButtons.map((el, index) => {
            return (
              <li
                key={index}
                className="mb-2 p-2 xl:px-4 w-fit rounded-full flex gap-4 items-center cursor-pointer hover:bg-gray-700"
              >
                <span className="text-[26px]">{el.icon}</span>
                <span
                  className={`${
                    index === 0 ? 'font-semibold' : ''
                  } text-xl hidden xl:inline`}
                >
                  {el.title}
                </span>
              </li>
            );
          })}
        </ul>{' '}
      </div>
      <div className="xl:px-2 xl:pr-6 xl:w-full w-full pr-4 lg:pr-0 lg:pl-3">
        <CreatePostModal />
      </div>
      <SidebarUserInfo user={user} />
    </div>
  );
};

const SidebarUserInfo: React.FC<SidebarProps> = (props) => {
  const { user } = props;

  if (!user) {
    return null;
  }

  return (
    <div className="flex absolute bottom-5 items-center w-fit gap-2 xl:py-2 xl:px-3 hover:bg-[#e7e9ea1a] rounded-full xl:mr-3 mr-3 lg:mr-1">
      {user.profilePicUrl && (
        <Image
          className="rounded-full"
          alt="user-image"
          src={user.profilePicUrl}
          height={40}
          width={40}
        />
      )}
      <div className="hidden xl:block">
        <p className="text-base font-semibold hover:underline cursor-pointer">
          {user.firstName + ' ' + (user.lastName || '')}
        </p>
        <p className="text-gray-400 text-sm">@{user.userName}</p>
      </div>
    </div>
  );
};

export default Sidebar;
