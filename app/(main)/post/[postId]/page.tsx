import { usePostDetails } from '@/hooks/post';

const PostPage = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId;
  const { status, data } = usePostDetails(postId);
  console.log(data);
  return <div>{params.postId}</div>;
};

export default PostPage;
