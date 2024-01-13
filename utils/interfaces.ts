import { Post, User } from '@/gql/graphql';
import React from 'react';

export interface ExtendedUser extends User {
  follower: User[] | [];
  following: User[] | [];
}
export interface PostInterface {
  content: string;
  imageUrl?: string;
}

export interface ReplyInterface {
  content: string;
  imageUrl?: string;
  postId: string;
  parentId?: string;
}

export interface SidebarMenuInterface {
  title: string;
  icon: React.ReactNode;
  link?: string;
  activeIcon?: React.ReactNode;
}

export interface HashtagLayoutProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  user: User | undefined | null;
}

export interface UserProfileImageProps {
  src: string | null | undefined;
  alt?: string;
  userName: string;
}

export interface UserPostsFilterMenu {
  name: string;
  key: string;
}

export interface PostsFilterStatus {
  status: string;
  posts: Post[] | [];
  isFetching: boolean;
}

export interface ProfileActionProps {
  loggedInUser?: User | null;
  currentUser: ExtendedUser;
  invalidateFn?: () => void;
}
