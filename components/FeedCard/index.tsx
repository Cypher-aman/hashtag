import React from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { IoBookmarkOutline } from 'react-icons/io5';
import { Post } from '@/gql/graphql';
import { formatTimestamp } from '@/utils/helper';
import UserProfileImage from '../UserProfileImage';

const FeedCard: React.FC<Post> = (props) => {
  const { content, imageUrl, createdAt, author } = props;
  return (
    <article className="border border-r-0 border-l-0 border-b-0 border-gray-600 px-3 py-5 feed-card  transition-all cursor-pointer">
      <div className="flex gap-3">
        <div className="w-[40px] h-auto">
          <UserProfileImage
            src={author?.profilePicUrl}
            userName={author?.userName!}
          />
        </div>
        <div className="w-full">
          <div className="flex justify-start gap-1 items-center mb-1 w-full">
            <h5 className="font-bold hover:underline">
              {author?.firstName} {author?.lastName}
            </h5>
            <span className="text-sm font-light text-gray-400">
              @{author?.userName}
            </span>
            <span className="font-light text-gray-400 text-sm">
              &#183; {formatTimestamp(createdAt)}
            </span>
          </div>

          <p>{content}</p>
          {imageUrl && (
            <div className="w-fit overflow-hidden rounded-md border border-gray-500  mt-3">
              <img
                src={imageUrl}
                className="w-auto h-auto max-w-full object-cover max-h-[500px]"
                alt="Uploaded image"
              />
            </div>
          )}
          <div className="flex justify-between mt-3 text-xl items-center p-2 w-[90%]">
            <button className="text-[20px] p-2 hover:bg-blue-500 hover:bg-opacity-10 rounded-full hover:text-blue-500 flex items-center gap-2">
              <BiMessageRounded />
              <span className="text-sm text-gray-500 hover:text-blue-500">
                0
              </span>
            </button>
            <button className="text-[20px] p-2 hover:bg-green-500 hover:bg-opacity-10 rounded-full hover:text-green-500 flex items-center gap-2">
              <AiOutlineRetweet />
              <span className="text-sm text-gray-500 hover:text-green-500">
                0
              </span>
            </button>
            <button className="group flex items-center">
              <AiOutlineHeart className="group-hover:bg-[#f91880] group-hover:bg-opacity-10 p-2 rounded-full text-4xl group-hover:text-[#f91880]" />
              <span className="text-sm text-gray-500 group-hover:text-[#f91880]">
                0
              </span>
            </button>
            <button className="text-[20px] p-2 hover:bg-blue-500 hover:bg-opacity-10 rounded-full hover:text-blue-500 flex items-center gap-2">
              <IoBookmarkOutline fill={true} />
              <span className="text-sm text-gray-500 hover:text-blue-500">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(FeedCard);
