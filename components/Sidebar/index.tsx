'use client';

import { SidebarMenuInterface, SidebarProps } from '@/utils/interfaces';
import React from 'react';
import { BiSolidHome, BiHome } from 'react-icons/bi';
import { FaHashtag, FaRegUser, FaUser } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiEnvelope } from 'react-icons/hi2';
import {
  IoBookmarkOutline,
  IoNotificationsOutline,
  IoSearchOutline,
  IoBookmark,
  IoSearchSharp,
  IoNotifications,
} from 'react-icons/io5';
import { CreatePostModal } from '../Modals/CreatePostModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutPopover from '../Popover/LogoutPopover';

const Sidebar: React.FC<SidebarProps> = (props) => {
  const pathname = usePathname();
  const { user } = props;
  const sideBarMenuButtons: SidebarMenuInterface[] = [
    {
      title: 'Home',
      icon: <BiHome />,
      link: '/home',
      activeIcon: <BiSolidHome />,
    },
    {
      title: 'Explore',
      icon: <IoSearchOutline />,
      link: '/explore',
      activeIcon: <IoSearchSharp />,
    },
    {
      title: 'Notifications',
      icon: <IoNotificationsOutline />,
      link: '/notifications',
      activeIcon: <IoNotifications />,
    },
    {
      title: 'Messages',
      icon: <HiOutlineEnvelope />,
      link: '/messages',
      activeIcon: <HiEnvelope />,
    },
    {
      title: 'Bookmarks',
      icon: <IoBookmarkOutline />,
      link: '/bookmarks',
      activeIcon: <IoBookmark />,
    },
    {
      title: 'Profile',
      icon: <FaRegUser />,
      link: `/${user?.userName}`,
      activeIcon: <FaUser />,
    },
  ];

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
                {' '}
                <Link className="flex gap-4" href={el.link || '/home'}>
                  <span className="text-[26px]">
                    {pathname === el.link ? el.activeIcon : el.icon}
                  </span>
                  <span
                    className={`${
                      pathname === el.link ? 'font-semibold' : ''
                    } text-xl hidden xl:inline`}
                  >
                    {el.title}
                  </span>
                </Link>
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

  return <LogoutPopover user={user} />;
};

export default Sidebar;
