import { useRecommendedUsers } from '@/hooks/user';
import { ExtendedUser } from '@/utils/interfaces';
import ProfileAction from '../ProfileAction';
import Image from 'next/image';
import { User } from '@/gql/graphql';
import LoadingSpinner from '../Skeletons/LoadingSpinner';

const RecommendedUser = ({ loggedInUser }: { loggedInUser: User }) => {
  const { status, recommendedUsers } = useRecommendedUsers();

  if (status === 'pending')
    return (
      <div className="xl:w-[350px] lg:w-[280px] flex flex-col gap-3 bg-[#16181c] rounded-xl h-[300px] py-4">
        <h3 className="px-3 text-xl font-bold ">You might like</h3>
        <div className="flex justify-center h-full items-center py-4">
          <LoadingSpinner />
        </div>
      </div>
    );

  if (status === 'success' && recommendedUsers?.length === 0) {
    return null;
  }
  return (
    <div className="xl:w-[350px] lg:w-[280px] flex flex-col gap-3 bg-[#16181c] rounded-xl  py-4">
      <h3 className="px-3 text-xl font-bold ">You might like</h3>
      {recommendedUsers?.map((currentUser) => (
        <div
          key={currentUser?.id}
          className="flex  justify-between  items-center w-full gap-2 hover:bg-[#e7e9ea1a] px-3 py-3"
        >
          {' '}
          <div className="flex gap-2  ">
            <div className="w-[40px] h-[40px] ">
              {currentUser?.profilePicUrl && (
                <Image
                  className="rounded-full"
                  alt="user-image"
                  src={currentUser.profilePicUrl}
                  height={40}
                  objectFit="cover"
                  width={40}
                />
              )}
            </div>
            <div className="xl:max-w-[153px] lg:max-w-[85px]">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold hover:underline cursor-pointer">
                {currentUser?.firstName + ' ' + (currentUser?.lastName || '')}
              </p>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-400 text-sm">
                @{currentUser?.userName}
              </p>
            </div>
          </div>
          <div className="min-w-max">
            <ProfileAction
              currentUser={currentUser as ExtendedUser}
              loggedInUser={loggedInUser}
              invalidateFn={() => {}}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedUser;
