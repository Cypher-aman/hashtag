'use client';

import { GraphQL } from '@/client/api';
import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import UserProfileImage from '@/components/UserProfileImage';
import { Input } from '@/components/ui/input';
import { Post, User } from '@/gql/graphql';
import { getSearchPostsQuery } from '@/graphql/query/post';
import { getSearchUsersQuery } from '@/graphql/query/user';
import { formatTimestamp } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiSearch } from 'react-icons/ci';
import Image from 'next/image';
import UserAvatar from '@/assets/images/user-avatar.jpg';

const Menu = [
  {
    name: 'Posts',
    key: 'posts',
  },
  {
    name: 'Users',
    key: 'users',
  },
];

const ExplorePage = () => {
  const [query, setQuery] = useState<string>('');

  const [selectedFilter, setSelectedFilter] = useState('posts');
  const [loading, setLoading] = useState(false);

  const [usersList, setUsersList] = useState<User[] | []>([]);
  const [postsList, setPostsList] = useState<Post[] | []>([]);

  const handleSearch = async () => {
    switch (selectedFilter) {
      case 'posts': {
        try {
          setLoading(true);
          const { getPosts } = await GraphQL.request(getSearchPostsQuery, {
            query,
          });
          setPostsList(getPosts as Post[]);
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setLoading(false);
        }
        break;
      }
      case 'users': {
        try {
          setLoading(true);
          const { searchUsers } = await GraphQL.request(getSearchUsersQuery, {
            query,
          });
          setUsersList(searchUsers as User[]);
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [query, selectedFilter]);

  const handleFilterChange = useCallback((key: string) => {
    setSelectedFilter(key);
    if (key === 'posts') {
      setUsersList([]);
    } else if (key === 'users') {
      setPostsList([]);
    }
  }, []);
  return (
    <main className="w-full">
      <div>
        <div className="relative p-2">
          <CiSearch className="absolute top-5 left-4 text-[20px]" />
          <Input
            type="text"
            placeholder="type your query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full p-5 pl-8 dark:bg-dimWhite/10 dark:border-none"
          />
        </div>
        <div className="flex justify-around border-b border-[#536471]">
          {Menu.map((filter) => (
            <div
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
              className="hover:bg-[#e7e9ea1a] w-full py-4 text-center cursor-pointer"
            >
              {selectedFilter === filter.key ? (
                <button className="after:content-[''] after:-bottom-4 after:rounded-full after:left-0 after:w-full after:h-1 after:bg-purple-600 after:absolute relative">
                  {filter.name}
                </button>
              ) : (
                <button className="text-[#71767b]">{filter.name}</button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        {selectedFilter === 'posts' ? (
          <ShowPosts postsList={postsList} loading={loading} query={query} />
        ) : (
          <ShowUsers usersList={usersList} loading={loading} query={query} />
        )}
      </div>
    </main>
  );
};

const ShowPosts = ({
  postsList,
  loading,
  query,
}: {
  postsList: Post[] | [];
  loading: boolean;
  query: string;
}) => {
  const router = useRouter();

  if (query.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        Search something
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (!postsList?.length) {
    return (
      <div className="flex justify-center items-center py-10">
        No posts found with this query
      </div>
    );
  }
  return (
    <div>
      {postsList.map((post) => {
        const { author, content, imageUrl, createdAt } = post;
        return (
          <article
            className="border border-r-0 border-l-0 border-b-0 border-[#2f3336] px-3 py-5 feed-card  transition-all cursor-pointer"
            key={post?.id}
          >
            <div className="flex gap-3">
              <div className="w-[40px] h-auto">
                <UserProfileImage
                  src={author?.profilePicUrl}
                  userName={author?.userName!}
                />
              </div>
              <div className="w-full">
                <div
                  className="w-full"
                  onClick={() => router.push(`/post/${post.id}?q=p`)}
                >
                  <div className="flex justify-start gap-1 items-center mb-1 w-full">
                    <h5 className="font-bold hover:underline">
                      {author?.firstName} {author?.lastName}
                    </h5>
                    <span className="text-sm font-light text-gray-400">
                      @{author?.userName}
                    </span>
                    <span className="font-light text-gray-400 text-sm">
                      &#183; {formatTimestamp(createdAt) || ''}
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
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

const ShowUsers = ({
  usersList,
  loading,
  query,
}: {
  usersList: User[] | [];
  loading: boolean;
  query: string;
}) => {
  const router = useRouter();

  if (query.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        Search something
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (!usersList?.length) {
    return (
      <div className="flex justify-center items-center py-10">
        No user found with this query
      </div>
    );
  }

  return (
    <div>
      {usersList.map((user) => {
        return (
          <div
            key={user.id}
            className="hover:bg-[#e7e9ea1a] flex flex-col w-full py-4 cursor-pointer px-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={user.profilePicUrl || UserAvatar}
                  width={40}
                  height={40}
                  alt="profile pic"
                  className="rounded-full"
                  objectFit="cover"
                />
                <div className="flex flex-col items-start">
                  <h3 className="text-[18px] font-medium">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <span className="text-sm text-gray-500">
                    @{user.userName}
                  </span>
                </div>
              </div>
              <button
                onClick={() => router.push(`/${user.userName}`)}
                className="px-3 py-1 bg-[#EFF3F4] rounded-full text-[#0f1419] font-semibold"
              >
                View
              </button>
            </div>
            <span className="ml-[55px] mt-1">This is user&apos;s bio...</span>
          </div>
        );
      })}
    </div>
  );
};

export default ExplorePage;
