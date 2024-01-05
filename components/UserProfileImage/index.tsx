'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { UserProfileImageProps } from '@/utils/interfaces';
import UserAvatar from '@/assets/images/user-avatar.jpg';

const UserProfileImage: React.FC<UserProfileImageProps> = (props) => {
  const { src, alt, userName } = props;

  if (!userName) return null;
  return (
    <Link href={`/${userName}`}>
      <Image
        src={src || UserAvatar}
        alt={alt || 'User profile image'}
        width={40}
        height={40}
        className="rounded-full"
      />
    </Link>
  );
};

export default UserProfileImage;
