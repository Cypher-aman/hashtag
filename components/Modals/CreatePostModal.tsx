import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TbWriting } from 'react-icons/tb';
import CreatePost from '../CreatePost/createPost';
import { useCreatePost } from '@/hooks/post';
import { PostInterface } from '@/utils/interfaces';
import React, { useCallback } from 'react';

export function CreatePostModal() {
  const { mutate } = useCreatePost();
  const [postContent, setPostContent] = React.useState<PostInterface>({
    content: '',
    imageUrl: '',
  });

  const handlePostSubmit = useCallback(async () => {
    if (!postContent.content) return;
    mutate(postContent);
    setPostContent({
      content: '',
      imageUrl: '',
    });
  }, [postContent, mutate]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-xl rounded-full bg-purple-600 hover:bg-purple-500 cursor-pointer py-3 mt-5 xl:w-full flex justify-center items-center w-fit xl:px-0 px-3">
          <span className="text-[26px] inline xl:hidden">
            <TbWriting />
          </span>
          <span className="hidden xl:inline">Post</span>
        </button>
      </DialogTrigger>
      <DialogContent className="md:w-[500px] md:max-h-[500px] overflow-y-scroll hide-scrollbar w-screen h-full md:h-max">
        <CreatePost
          postContent={postContent}
          setPostContent={setPostContent}
          handlePostSubmit={handlePostSubmit}
        />
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostModal;
