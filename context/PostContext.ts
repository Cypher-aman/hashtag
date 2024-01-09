import { Post } from '@/gql/graphql';
import { createContext } from 'react';

export interface PostContextInterface {
  postList: Post[];
  status: 'pending' | 'success' | 'error';
}

export const PostContext = createContext<PostContextInterface | null>(null);
