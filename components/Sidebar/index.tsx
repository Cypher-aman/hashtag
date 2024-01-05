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
import { TbWriting } from 'react-icons/tb';
import Image from 'next/image';

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
    <div className="flex flex-col w-full items-end lg:items-start xl:pr-10 lg:pr-6">
      <div className="text-3xl ml-2 p-2 mr-5 hover:bg-gray-700 rounded-full w-fit cursor-pointer">
        <FaHashtag className="rotate-12" />
      </div>
      <div className="mt-5 mr-5 lg:mr-0">
        <ul>
          {sideBarMenuButtons.map((el, index) => {
            return (
              <li
                key={index}
                className="mb-2 p-2 lg:px-4 w-fit rounded-full flex gap-4 items-center cursor-pointer hover:bg-gray-700"
              >
                <span className="text-[26px]">{el.icon}</span>
                <span
                  className={`${
                    index === 0 ? 'font-semibold' : ''
                  } text-xl hidden lg:inline`}
                >
                  {el.title}
                </span>
              </li>
            );
          })}
        </ul>{' '}
      </div>
      <div className="px-2 lg:pr-6 pr-4 lg:w-full w-fit">
        <button className="text-xl rounded-full bg-purple-600 hover:bg-purple-500 cursor-pointer py-3 mt-5 lg:w-full flex justify-center items-center w-fit lg:px-0 px-3">
          <span className="text-[26px] inline lg:hidden">
            <TbWriting />
          </span>
          <span className="hidden lg:inline">Post</span>
        </button>
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
    <div className="flex absolute bottom-5 items-center w-fit gap-2 py-2 px-3 hover:bg-[#e7e9ea1a] rounded-full mr-3 lg:mr-0">
      {user.profilePicUrl && (
        <Image
          className="rounded-full"
          alt="user-image"
          src={user.profilePicUrl}
          height={40}
          width={40}
        />
      )}
      <div className="hidden lg:block">
        <p className="text-base font-semibold hover:underline cursor-pointer">
          {user.firstName + ' ' + (user.lastName || '')}
        </p>
        <p className="text-gray-400 text-sm">@{user.userName}</p>
      </div>
    </div>
  );
};

export default Sidebar;
