'use client';

import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import { Notification } from '@/gql/graphql';
import { useNotifications } from '@/hooks/user';
import { generateNotificationText } from '@/utils/helper';
import Image from 'next/image';
import UserAvatar from '@/assets/images/user-avatar.jpg';
import Link from 'next/link';

const NotificationPage = () => {
  const { status, notifications } = useNotifications();

  if (status === 'pending') {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!notifications) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No Notifications</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl py-6 p-3 font-bold ">Notifications</h1>
      {notifications.map((notification) => {
        const { sender } = notification as Notification;
        const { link, text } = generateNotificationText(
          notification as Notification
        );
        return (
          <Link href={link}>
            <div className="flex items-center gap-2 px-3 py-5 border-t border-b border-[#2f3336] hover:bg-[#e7e9ea1a]">
              <Link href={`/${sender?.userName}`}>
                <Image
                  src={sender?.profilePicUrl || UserAvatar}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                  objectFit="cover"
                />
              </Link>

              <p>
                <b>
                  {sender?.firstName} {sender?.lastName ?? ''}
                </b>
                &nbsp;{text}
              </p>
            </div>{' '}
          </Link>
        );
      })}
    </div>
  );
};

export default NotificationPage;
