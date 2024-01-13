import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreatePost from '../CreatePost/createPost';
import { useCreateReply } from '@/hooks/post';
import { PostInterface } from '@/utils/interfaces';
import React, { useCallback } from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import Image from 'next/image';
import { countRemainingChar, formatTimestamp } from '@/utils/helper';
import { Post } from '@/gql/graphql';
import { useQueryClient } from '@tanstack/react-query';

interface CreateReplyModalProps {
  post: Post;
  keyName: string;
}

const CreateReplyModal: React.FC<CreateReplyModalProps> = (props) => {
  const { post, keyName } = props;
  const { content, imageUrl, createdAt, author } = post;
  const [replyContent, setReplyContent] = React.useState<PostInterface>({
    content: '',
    imageUrl: '',
  });
  const queryClient = useQueryClient();
  const mutation = useCreateReply();

  const handleReplySubmit = useCallback(async () => {
    if (!replyContent.content) return;
    mutation.mutate({
      ...replyContent,
      parentId: post.id,
    });
    queryClient.invalidateQueries({ queryKey: [keyName] });
    setReplyContent({
      content: '',
      imageUrl: '',
    });
  }, [replyContent, mutation, post.id, queryClient, keyName]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group flex items-center">
          <BiMessageRounded className="group-hover:bg-blue-500 group-hover:bg-opacity-10 p-2 rounded-full text-4xl group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 group-hover:text-blue-500">
            {post.replies?.length}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="md:w-[500px] md:max-h-[500px] overflow-y-scroll hide-scrollbar w-screen h-full max-w-screen md:h-max flex gap-3 md:top-10 md:-translate-y-0">
        <div className="flex flex-col w-full">
          <div className="w-full flex gap-4 px-3 ">
            <div className="w-[40px] h-auto">
              <Image
                src={author?.profilePicUrl}
                width={40}
                height={40}
                alt="Profile picture"
                className="rounded-full"
                objectFit="cover"
              />
            </div>
            <div className="w-full max-h-[400px] overflow-y-scroll hide-scrollbar">
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
              {/* {imageUrl && (
                <div className="w-fit overflow-hidden rounded-md border border-gray-500  mt-3">
                  <Image
                    src={imageUrl}
                    width={250}
                    height={250}
                    alt="Uploaded image"
                    objectFit="cover"
                  />
                </div>
              )} */}
              <div className="py-3">
                <span className="text-gray-600 mr-2">Replying to</span>
                <span className="text-blue-700">@{author.userName}</span>
              </div>
            </div>
          </div>
          <div>
            <CreatePost
              showSubmitButton={false}
              postContent={replyContent}
              setPostContent={setReplyContent}
            >
              <DialogFooter>
                <DialogClose asChild>
                  <button
                    onClick={handleReplySubmit}
                    disabled={
                      !replyContent.content ||
                      countRemainingChar(replyContent.content, 240) < 0
                    }
                    className="text-base rounded-full bg-purple-600 hover:bg-purple-500 cursor-pointer px-4 py-1 w-fit disabled:cursor-not-allowed disabled:bg-purple-400 disabled:hover:bg-purple-400 "
                  >
                    Post
                  </button>
                </DialogClose>
              </DialogFooter>
            </CreatePost>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReplyModal;
