import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { User } from '@/gql/graphql';
import { SidebarMenuInterface } from '@/utils/interfaces';
import { BiHome, BiSolidHome, BiLogOut } from 'react-icons/bi';
import { FaRegUser, FaUser } from 'react-icons/fa6';
import { HiEnvelope, HiOutlineEnvelope } from 'react-icons/hi2';
import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoNotifications,
  IoSearchSharp,
} from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserAvatar from '@/assets/images/user-avatar.jpg';

const SideScreenMenu = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const sideBarMenuButtons: SidebarMenuInterface[] = [
    {
      title: 'Home',
      icon: <BiHome />,
      link: '/home',
      activeIcon: <BiSolidHome />,
    },
    {
      title: 'Explore',
      icon: <IoSearchOutline />,
      link: '/explore',
      activeIcon: <IoSearchSharp />,
    },
    {
      title: 'Notifications',
      icon: <IoNotificationsOutline />,
      link: '/notifications',
      activeIcon: <IoNotifications />,
    },
    {
      title: 'Messages',
      icon: <HiOutlineEnvelope />,
      link: '/messages',
      activeIcon: <HiEnvelope />,
    },
    {
      title: 'Bookmarks',
      icon: <IoBookmarkOutline />,
      link: '/bookmarks',
      activeIcon: <IoBookmark />,
    },
    {
      title: 'Profile',
      icon: <FaRegUser />,
      link: `/${user?.userName}`,
      activeIcon: <FaUser />,
    },
  ];

  const onLogout = () => {
    window.localStorage.removeItem('__hashtag_token');
    location.reload();
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="absolute left-5 cursor-pointer">
          <Image
            src={user?.profilePicUrl || UserAvatar}
            alt="profile"
            width={30}
            height={30}
            className="rounded-full"
            objectFit="cover"
          />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className="dark:bg-modalGray">
        <SheetHeader>
          <SheetTitle>
            <Image
              src={user?.profilePicUrl || UserAvatar}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full"
              objectFit="cover"
            />
          </SheetTitle>
          <SheetDescription className="text-left">
            <h2 className="font-semibold  text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <span className="text-gray-400">@{user?.userName}</span>
          </SheetDescription>
        </SheetHeader>
        <ul className="mt-5">
          {sideBarMenuButtons.map((el, index) => {
            return (
              <li
                key={index}
                className="mb-2 py-2 w-fit px-2 rounded-full items-center cursor-pointer hover:bg-dimWhite/10"
              >
                {' '}
                <Link className="flex gap-4" href={el.link || '/home'}>
                  <span className="text-[26px]">
                    {pathname === el.link ? el.activeIcon : el.icon}
                  </span>
                  <span
                    className={`${
                      pathname === el.link ? 'font-semibold' : ''
                    } text-xl`}
                  >
                    {el.title}
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="mb-2 py-2 px-2 flex gap-4  w-fit rounded-full items-center cursor-pointer hover:bg-dimWhite/10">
            <span className="text-[26px]">
              <BiLogOut />
            </span>
            <span onClick={onLogout} className="text-xl">
              Logout
            </span>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default SideScreenMenu;
