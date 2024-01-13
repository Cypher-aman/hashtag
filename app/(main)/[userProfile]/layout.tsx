'use client';

import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import { UserContext } from '@/context/ProfileUserContext';
import { useUserByName } from '@/hooks/user';
import { ExtendedUser } from '@/utils/interfaces';
import Error from '@/components/Error/error';

const ProfilePageLayout = ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { userProfile: string };
}) => {
  const { userProfile: userName } = params;

  const { status, currentUser, isFetching } = useUserByName(userName);

  if (status === 'error') {
    return <Error />;
  } else if (status === 'pending') {
    return (
      <div className="h-screen flex justify-center items-center ">
        <LoadingSpinner />
      </div>
    );
  } else if (status === 'success' && !currentUser?.id) {
    return <div className="text-center text-gray-400 ">User Not Found</div>;
  }

  return (
    <main className="relative w-full">
      <UserContext.Provider
        value={{ user: currentUser as ExtendedUser, status }}
      >
        {children}
      </UserContext.Provider>
    </main>
  );
};

export default ProfilePageLayout;
