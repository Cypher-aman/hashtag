import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { User } from '@/gql/graphql';
import Image from 'next/image';
import UserAvatar from '@/assets/images/user-avatar.jpg';
import { BsThreeDotsVertical } from 'react-icons/bs';

const LogoutPopover = ({ user }: { user: User }) => {
  const onLogout = () => {
    window.localStorage.removeItem('__hashtag_token');
    location.reload();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex absolute bottom-5 items-center w-fit gap-2 xl:py-2 xl:px-3 hover:bg-[#e7e9ea1a] cursor-pointer rounded-full xl:mr-3 mr-3 lg:mr-1">
          <Image
            className="rounded-full"
            alt="user-image"
            src={user.profilePicUrl || UserAvatar}
            height={40}
            width={40}
          />
          <div className="hidden xl:block">
            <p className="text-base font-semibold">
              {user.firstName + ' ' + (user.lastName || '')}
            </p>
            <p className="text-gray-400 text-sm">@{user.userName}</p>
          </div>
          <div className="hidden xl:block">
            <BsThreeDotsVertical />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="py-0 dark:bg-black w-fit">
        <Button
          type="button"
          variant={'ghost'}
          className="dark:border-none"
          onClick={onLogout}
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default LogoutPopover;
