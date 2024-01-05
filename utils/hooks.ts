// import { useState } from 'react';
// import { PostsFilterStatus } from './interfaces';
// import { useUserPosts } from '@/hooks/post';

// export const useUserPostsFilter = (userName: string) => {
//   const [selectedFilter, setSelectedFilter] = useState('posts');
//   const [fetchStatus, setfetchStatus] = useState<PostsFilterStatus>({
//     status: '',
//     posts: [],
//     isFetching: false,
//   });

//   switch (selectedFilter) {
//     case 'posts': {
//       const allPosts = useUserPosts(userName, 'posts');
//       setfetchStatus({
//         status: allPosts.status,
//         posts: allPosts.posts,
//         isFetching: allPosts.isFetching,
//       });
//     }
//   }

//   return {
//     selectedFilter,
//     setSelectedFilter,
//     fetchStatus,
//     setfetchStatus,
//   };
// };
