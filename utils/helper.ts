import { User } from '@/gql/graphql';
import { ExtendedUser } from './interfaces';

export const formatTimestamp = (timestamp: any) => {
  const targetDate: any = new Date(timestamp);
  const now: any = new Date();
  const timeDifference = now - targetDate;
  const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

  if (days < 1) {
    // Within the last 24 hours
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
    }

    const minutes = Math.floor(timeDifference / (60 * 1000));
    if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
    }

    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} ${seconds === 1 ? 'sec' : 'sec'}`;
  } else {
    // More than 24 hours ago
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = targetDate.toLocaleDateString('en-US', options);
    return `${formattedDate}`;
  }
};

export const countRemainingChar = (text: string, limit: number) => {
  return limit - text.length;
};

export const checkFollowStatus = (
  currentUser: ExtendedUser,
  loggedInUser: User
) => {
  const followerIndex = currentUser.follower.findIndex(
    (el) => el.id === loggedInUser.id
  );
  const followingIndex = currentUser.following.findIndex(
    (el) => el.id === loggedInUser.id
  );
  return { follower: followerIndex, following: followingIndex };
};
