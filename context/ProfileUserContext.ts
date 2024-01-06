import { ExtendedUser } from '@/utils/interfaces';
import { createContext } from 'react';

interface UserContextInterface {
  user: ExtendedUser;
  status: string;
}

export const UserContext = createContext<UserContextInterface | null>(null);
