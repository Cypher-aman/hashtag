'use client';

import React, { useCallback } from 'react';
import FeedCard from '@/components/FeedCard';
import { useGetUser } from '@/hooks/user';
import { PostInterface } from '@/utils/interfaces';
import { useCreatePost, useGetAllPosts } from '@/hooks/post';
import { Post } from '@/gql/graphql';
import UserProfileImage from '@/components/UserProfileImage';
import { IoImageOutline } from 'react-icons/io5';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GraphQL } from '@/client/api';
import { getPresignerURLQuery } from '@/graphql/query/post';
import Image from 'next/image';
import { countRemainingChar } from '@/utils/helper';
import { IoCloseOutline } from 'react-icons/io5';

export default function Home() {
  const { user } = useGetUser();
  const [postContent, setPostContent] = React.useState<PostInterface>({
    content: '',
    imageUrl: '',
  });
  const [textAreaRows, setTextAreaRows] = React.useState('');
  const { posts = [] } = useGetAllPosts();
  const { mutate } = useCreatePost();

  const handlePostSubmit = useCallback(async () => {
    if (!postContent.content) return;
    mutate(postContent);
    setPostContent({
      content: '',
      imageUrl: '',
    });
  }, [postContent, mutate]);

  const handleImageUpload = async (file: File) => {
    try {
      toast.loading('Uploading image...', { id: '2' });
      const { getPresignerURL } = await GraphQL.request(getPresignerURLQuery, {
        imageType: file.type,
        imageName: file.name,
      });

      if (!getPresignerURL) throw new Error('Failed to upload image');

      await axios.put(getPresignerURL, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      toast.success('Image uploaded successfully', { id: '2' });
      const imageUrl = getPresignerURL.split('?')[0];

      setPostContent((prevState) => ({
        ...prevState,
        imageUrl: imageUrl,
      }));
    } catch (error) {
      toast.error('Failed to upload image', { id: '2' });
    }
  };

  const handleImageSubmit = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute(
      'accept',
      'image/png, image/jpeg, image/jpg, image/webp'
    );

    input.addEventListener('change', (e) => {
      e.preventDefault();
      const selectedFile = (input as HTMLInputElement).files?.[0];
      if (!selectedFile) return;
      handleImageUpload(selectedFile);
    });
    input.click();
  }, []);

  const handleTextAreaInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;

      setPostContent((prevState) => ({
        ...prevState,
        content: newText,
      }));

      const textAreaHeight = e.target.scrollHeight;
      if (newText.length === 0) setTextAreaRows('fit-content');
      else setTextAreaRows(`${textAreaHeight}px`);
    },
    []
  );

  return (
    <React.Fragment>
      <div className="flex justify-start py-4 px-3 gap-2">
        <div className="w-[40px]">
          <UserProfileImage
            src={user?.profilePicUrl}
            userName={user?.userName!}
          />
        </div>

        <div className="w-full flex flex-col h-max px-2">
          <textarea
            className="hide-scrollbar w-full h-auto bg-transparent focus:outline-none resize-none mb-2"
            style={{ height: textAreaRows }}
            placeholder="What's happening?"
            rows={3}
            value={postContent.content}
            onChange={(e) => handleTextAreaInput(e)}
          ></textarea>
          {postContent.imageUrl && (
            <div className="relative w-full overflow-hidden rounded h-[200px] max-w-[400px] max-h-[400px] mb-2">
              <Image
                src={postContent.imageUrl}
                fill
                objectFit="cover"
                alt="Uploaded image"
              />
              <button
                onClick={() => setPostContent({ ...postContent, imageUrl: '' })}
                className="text-xl p-2 rounded-full bg-gray-700 absolute text-white top-3 right-3"
              >
                <IoCloseOutline />
              </button>
            </div>
          )}
          <span
            className={`inline-block text-right text-sm border-b-[1px] border-gray-700 w-full ${
              countRemainingChar(postContent.content, 240) < 0
                ? 'text-red-600'
                : 'text-gray-400'
            }`}
          >
            {countRemainingChar(postContent.content, 240)}
          </span>
          <div className="flex justify-between items-center mt-2">
            <div className="flex itcems-center gap-3 text-xl text-purple-200">
              <button onClick={handleImageSubmit}>
                <IoImageOutline />
              </button>
            </div>
            <button
              onClick={handlePostSubmit}
              disabled={
                !postContent.content ||
                countRemainingChar(postContent.content, 240) < 0
              }
              className="text-base rounded-full bg-purple-600 hover:bg-purple-500 cursor-pointer px-4 py-1 w-fit disabled:cursor-not-allowed disabled:bg-purple-400 disabled:hover:bg-purple-400 "
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {posts &&
        posts?.map((post) => <FeedCard key={post?.id} {...(post as Post)} />)}
    </React.Fragment>
  );
}
