import { User } from '@/gql/graphql';
import { createContext } from 'react';

interface LoggedInUserContextInterface {
  user: User | undefined | null;
  status: string;
}

export const LoggedInUserContext =
  createContext<LoggedInUserContextInterface | null>(null);
