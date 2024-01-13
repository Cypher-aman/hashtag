'use client';

import { User } from '@/gql/graphql';
import { useCurrentUserContext } from '@/hooks/user';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import Image from 'next/image';
import UserAvatar from '@/assets/images/user-avatar.jpg';
import { useSearchParams } from 'next/navigation';

const Menu = [
  {
    name: 'Followers',
    key: 'followers',
  },
  {
    name: 'Following',
    key: 'following',
  },
];

const Detail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultOption = searchParams.get('q');
  const [selectedFilter, setSelectedFilter] = useState(defaultOption);
  const { status, user: currentUser } = useCurrentUserContext();
  const [usersList, setUsersList] = useState<User[] | []>(
    defaultOption === 'followers'
      ? currentUser?.follower || []
      : currentUser?.following || []
  );

  const currentUrl = String(window.location.href).split('?')[0];
  const handleFilterChange = useCallback(
    (key: string) => {
      if (key === 'followers') {
        setUsersList(currentUser?.follower || []);
      } else if (key === 'following') {
        setUsersList(currentUser?.following || []);
      }

      setSelectedFilter(key);
      const newUrl = `${currentUrl}?q=${key}`;
      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        '',
        newUrl
      );
    },
    [currentUser]
  );

  if (!currentUser) return null;

  return (
    <React.Fragment>
      <div className="flex gap-6 max-w-[600px] p-3 items-center h-[60px] sticky top-0 w-full z-20">
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
            <span className="text-sm text-gray-500">
              @{currentUser?.userName}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-around border-b border-[#536471]">
        {Menu.map((filter) => (
          <div
            key={filter.key}
            onClick={() => handleFilterChange(filter.key)}
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
      <div className="">
        {usersList.map((user) => (
          <div
            key={user.id}
            className="hover:bg-[#e7e9ea1a] flex flex-col w-full py-4 cursor-pointer px-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={user.profilePicUrl || UserAvatar}
                  width={40}
                  height={40}
                  alt="profile pic"
                  className="rounded-full"
                  objectFit="cover"
                />
                <div className="flex flex-col items-start">
                  <h3 className="text-[18px] font-medium">
                    {user.firstName} {user.lastName}
                  </h3>
                  <span className="text-sm text-gray-500">
                    @{user.userName}
                  </span>
                </div>
              </div>
              <button
                onClick={() => router.push(`/${user.userName}`)}
                className="px-3 py-1 bg-[#EFF3F4] rounded-full text-[#0f1419] font-semibold"
              >
                View
              </button>
            </div>
            <span className="ml-[55px] mt-1">This is user&apos;s bio...</span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Detail;
