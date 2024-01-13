'use client';

import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import {
  useCreateReply,
  usePostContext,
  usePostDetails,
  usePostUpadate,
} from '@/hooks/post';
import Error from '@/components/Error/error';
import { useRouter } from 'next/navigation';
import { GoArrowLeft } from 'react-icons/go';
import Image from 'next/image';
import { formatTimestampLong } from '@/utils/helper';
import UserProfileImage from '@/components/UserProfileImage';
import Link from 'next/link';
import CreateReplyModal from '@/components/Modals/CreateReplyModal';
import { Post } from '@/gql/graphql';
import { AiOutlineRetweet, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IoBookmarkOutline } from 'react-icons/io5';
import CreatePost from '@/components/CreatePost/createPost';
import { PostInterface } from '@/utils/interfaces';
import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import PostCard from '@/components/PostCard';

const PostPage = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId;
  const { status, post: _post } = usePostDetails(postId);
  const router = useRouter();
  const { post, postFn } = usePostUpadate(_post as Post);
  const {
    postFn: replyFn,
    posts,
    isUpdating,
  } = usePostContext('post_details', post?.replies as Post[]);
  const keyName = 'post_details';
  const queryClient = useQueryClient();
  const [replyContent, setReplyContent] = React.useState<PostInterface>({
    content: '',
    imageUrl: '',
  });

  const mutation = useCreateReply();
  const handleReplySubmit = useCallback(async () => {
    if (!replyContent.content) return;
    mutation.mutate({
      ...replyContent,
      parentId: post?.id,
    });

    setReplyContent({
      content: '',
      imageUrl: '',
    });
  }, [replyContent, mutation, post?.id, queryClient]);

  if (status === 'pending') {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'error' || !post?.id) {
    return <Error />;
  }

  const { author } = post;
  console.log('inside-main');

  return (
    <main>
      <section>
        <div className="flex gap-6 max-w-[600px] p-3 items-center h-[60px] sticky top-0 w-full backdrop-blur-xl z-20">
          <button
            onClick={() => router.back()}
            className="text-[25px] p-2 hover:bg-[#e7e9ea1a] rounded-full"
          >
            <GoArrowLeft />
          </button>
          <div>
            <h1 className="text-[20px] font-semibold leading-6">Post</h1>
          </div>
        </div>
        <article className="flex flex-col justify-center gap-3 p-3">
          <div className="flex gap-3">
            <UserProfileImage
              src={author.profilePicUrl}
              userName={author.userName}
            />
            <div>
              <h2 className="text-lg font-semibold leading-6">
                {author.firstName} {author.lastName}
              </h2>
              <span className="text-sm text-gray-500 ">@{author.userName}</span>
            </div>
          </div>
          <div>
            <p>{post.content}</p>
            {post.imageUrl && (
              <div className="w-fit overflow-hidden rounded-md border border-gray-500  mt-3">
                <img
                  src={post.imageUrl}
                  className="w-auto h-auto max-w-full object-cover max-h-[500px]"
                  alt="Uploaded image"
                />
              </div>
            )}
            <div>
              <p className="text-gray-500 py-2">
                {formatTimestampLong(post.createdAt)}{' '}
              </p>
            </div>
          </div>
          {post.parentId && (
            <div className="text-gray-500">
              reply to &nbsp;
              <Link href={`/post/${post.parentId}`}>
                <span className="text-blue-500 underline">post</span>
              </Link>
            </div>
          )}
          <div className="flex justify-between mt-3 text-xl items-center p-2 px-4 border-t-[1px] border-b-[1px] border-gray-700 w-full">
            <CreateReplyModal post={post as Post} keyName={keyName} />
            <button className="text-[20px] p-2 hover:bg-green-500 hover:bg-opacity-10 rounded-full hover:text-green-500 flex items-center gap-2">
              <AiOutlineRetweet />
              <span className="text-sm text-gray-500 hover:text-green-500">
                0
              </span>
            </button>
            <button className="group flex items-center" disabled={isUpdating}>
              {post.isLiked ? (
                <AiFillHeart
                  onClick={() => postFn.unlikePost()}
                  className="group-hover:bg-[#f91880] group-hover:bg-opacity-10 p-2 rounded-full text-4xl text-[#f91880]"
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => postFn.likePost()}
                  className="group-hover:bg-[#f91880] group-hover:bg-opacity-10 p-2 rounded-full text-4xl group-hover:text-[#f91880]"
                />
              )}

              <span className="text-sm text-gray-500 group-hover:text-[#f91880]">
                {post.likeCount! > 0 ? post.likeCount : ''}
              </span>
            </button>
            <button className="text-[20px] p-2 hover:bg-blue-500 hover:bg-opacity-10 rounded-full hover:text-blue-500 flex items-center gap-2">
              <IoBookmarkOutline fill={true} />
              <span className="text-sm text-gray-500 hover:text-blue-500">
                0
              </span>
            </button>
          </div>
        </article>
      </section>
      <section>
        <CreatePost
          postContent={replyContent}
          setPostContent={setReplyContent}
          handlePostSubmit={handleReplySubmit}
        />
      </section>
      <section>
        {posts?.length > 0 ? (
          posts.map((post) => (
            <PostCard
              post={post}
              keyName={keyName}
              key={post.id}
              postFn={replyFn}
              isUpdating={isUpdating}
            />
          ))
        ) : (
          <div className="flex justify-center items-center py-10">
            No replies to this post
          </div>
        )}
      </section>
    </main>
  );
};

export default PostPage;
