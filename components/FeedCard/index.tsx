import React from 'react';
import Image from 'next/image';
import { BiMessageRounded, BiUpload } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { Post } from '@/gql/graphql';
import { formatTimestamp } from '@/utils/helper';

const FeedCard: React.FC<Post> = (props) => {
  const { content, imageUrl, createdAt, author } = props;
  console.log('props', props);
  return (
    <article className="border border-r-0 border-l-0 border-b-0 border-gray-600 px-3 py-5 feed-card  transition-all cursor-pointer">
      <div className="flex gap-3">
        <div className="w-[40px] h-auto">
          <Image
            className="rounded-full"
            src={author?.profilePicUrl}
            alt="user-image"
            height={40}
            width={40}
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
          <div className="flex justify-between mt-3 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <AiOutlineRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedCard;
