import { Like, Maybe, Post, Reply, Scalars, User } from '@/gql/graphql';
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

export interface PostAndReplyInterface {
  __typename?: 'Reply' | 'Post' | undefined | null;
  author: User;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  likes?: Maybe<Array<Maybe<Like>>>;
  parent?: Maybe<Reply>;
  parentId?: Maybe<Scalars['String']['output']>;
  post?: Post;
  postId?: Scalars['String']['output'];
  replies?: Maybe<Array<Maybe<Reply>>>;
  updatedAt: Scalars['Date']['output'];
}
