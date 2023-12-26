import React from 'react';
import Image from 'next/image';
import { BiMessageRounded, BiUpload } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';

const FeedCard: React.FC = () => {
  return (
    <article className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 feed-card  transition-all cursor-pointer">
      <div className="flex gap-4">
        <div className="">
          <Image
            src="https://avatars.githubusercontent.com/u/44976328?v=4"
            alt="user-image"
            height={100}
            width={100}
          />
        </div>
        <div className="">
          <div className="flex gap-2 items-center mb-1">
            {' '}
            <h5 className="font-bold">Piyush Garg</h5>
            <span className="text-sm font-light text-gray-400">
              @piyushgarg
            </span>
          </div>

          <p>
            Is it just me or everyone else? Do you feel the code quality
            decrease as the project size increases? Just refactored a lot of bad
            code ✨ #codinglife
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
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
