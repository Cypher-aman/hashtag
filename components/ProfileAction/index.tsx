import { GraphQL } from '@/client/api';
import { followUserQuery, unfollowUserQuery } from '@/graphql/mutation/user';
import { checkFollowStatus } from '@/utils/helper';
import { ProfileActionProps } from '@/utils/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import EditProfile from '../EditProfile/editProfile';

const ProfileAction: React.FC<ProfileActionProps> = ({
  loggedInUser,
  currentUser,
}) => {
  const queryClient = useQueryClient();
  const [disabled, setDisabled] = React.useState(false);
  if (!loggedInUser?.id) return <div className="py-4"></div>;

  if (loggedInUser.id === currentUser.id) {
    return <EditProfile user={currentUser} />;
  }

  const handleFollow = async () => {
    try {
      setDisabled(true);
      await GraphQL.request(followUserQuery, {
        to: currentUser.id,
      });

      queryClient.invalidateQueries({
        queryKey: ['recommended_users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user_by_name'],
      });
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setDisabled(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setDisabled(true);
      await GraphQL.request(unfollowUserQuery, {
        to: currentUser.id,
      });

      queryClient.invalidateQueries({
        queryKey: ['recommended_users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user_by_name'],
      });
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setDisabled(false);
    }
  };

  const { follower, following } = checkFollowStatus(currentUser, loggedInUser);

  return (
    <>
      {follower < 0 && (
        <button
          disabled={disabled}
          onClick={handleFollow}
          className="px-3 py-1 bg-[#EFF3F4] rounded-full text-[#0f1419] font-semibold"
        >
          {following >= 0 ? 'Follow back' : 'Follow'}
        </button>
      )}
      {follower >= 0 && (
        <button
          disabled={disabled}
          onClick={handleUnfollow}
          className="px-3 py-1 bg-[#EFF3F4] rounded-full text-[#0f1419] font-semibold"
        >
          Unfollow
        </button>
      )}
    </>
  );
};

export default React.memo(ProfileAction);
