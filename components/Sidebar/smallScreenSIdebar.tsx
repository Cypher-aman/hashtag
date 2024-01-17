import { FaHashtag } from 'react-icons/fa6';
import SideScreenMenu from '../Modals/SideScreenMenu';
import { User } from '@/gql/graphql';

const SmallScreenHeader = ({ user }: { user: User }) => {
  return (
    <nav className="sticky top-0 border-b border-[#2f3336] block sm:hidden">
      <div className="w-full relative py-4 backdrop-blur-3xl flex justify-center items-center">
        <SideScreenMenu user={user} />
        <div className="text-2xl">
          <FaHashtag className="rotate-12" />
        </div>
      </div>
    </nav>
  );
};

export default SmallScreenHeader;
