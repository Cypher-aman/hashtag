import { Notification, NotificationType, User } from '@/gql/graphql';
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

export function formatTimestampLong(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert to milliseconds

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${hours12}:${minutes} ${amPm} · ${month} ${day}, ${year}`;
}

type SenderType = {
  firstName: string;
  lastName: string;
  profilePicUrl: string;
  userName: string;
};

type Return = {
  text: string;
  link: string;
};

export const generateNotificationText = (
  notification: Notification
): Return => {
  const { sender, postId, type } = notification;
  const { firstName, lastName, userName } = sender as SenderType;

  const notif = {
    link: '',
    text: '',
  };

  switch (type) {
    case 'POST_LIKE': {
      notif.text = `liked your post`;
      notif.link = `/post/${postId}`;
      break;
    }
    case 'FOLLOW': {
      notif.text = `started following you`;
      notif.link = `/${userName}`;
      break;
    }
    case 'POST_COMMENT': {
      notif.text = `commented on your post`;
      notif.link = `/post/${postId}`;
      break;
    }
  }

  return notif;
};
