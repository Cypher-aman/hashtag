'use client';

import { HiOutlineHashtag } from 'react-icons/hi';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import SignUpForm from '@/components/Auth/SIgnUp/SignUp';
import { useRouter } from 'next/navigation';
import SignInForm from '@/components/Auth/SignIn/SignIn';
import toast from 'react-hot-toast';
import { getUserGoogleToken } from '@/graphql/query/user';
import { GraphQL } from '@/client/api';
import { useGetUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

// const isClient = typeof window !== 'undefined';

const AuthPage = () => {
  // const token = isClient && window.localStorage.getItem('__hashtag_token');
  const { user } = useGetUser();
  const queryClient = useQueryClient();

  const router = useRouter();
  if (user?.id) {
    return router.push('/home');
  }

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const authToken = credentialResponse.credential;

    if (!authToken) return toast.error('Something went wrong');

    try {
      const { verifyGoogleToken } = await GraphQL.request(getUserGoogleToken, {
        token: authToken,
      });
      window.localStorage.setItem('__hashtag_token', verifyGoogleToken);

      GraphQL.setHeaders({ Authorization: `Bearer ${verifyGoogleToken}` });
      await queryClient.invalidateQueries({ queryKey: ['user_info'] });

      router.refresh();
      toast.success('Logged in successfully');
    } catch (error: any) {
      console.log(error.message);
      toast.error('Something went wrong');
    }
  };
  return (
    <main className="flex justify-center min-h-screen w-full flex-col lg:flex-row items-center gap-4 py-10 px-6">
      <section className="sm:w-1/2 lg:h-full">
        <div className="flex justify-start lg:justify-center items-center w-full h-full">
          <HiOutlineHashtag className="lg:text-[320px] text-[60px] md:text-[100px] text-[#e7e9ea]" />
        </div>
      </section>
      <section className="sm:w-1/2 flex-shrink-0 lg:h-full">
        <div className="flex items-start text-[#e7e9ea] justify-center w-full h-full flex-col authpage-title">
          <h1 className="md:text-[64px] text-[40px] my-[20px] md:my-[50px] font-extrabold">
            Happening now
          </h1>
          <h2 className="text-[23px] md:text-[35px] mb-[18px] md:mb-[30px]  font-extrabold">
            Join today.
          </h2>
          <div className="md:mb-[70px] mb-[40px] w-full">
            <div className="rounded-full overflow-hidden w-full max-w-[300px]">
              <GoogleLogin
                width={300}
                onSuccess={handleGoogleLogin}
                onError={() => toast.error('Something went wrong!')}
              />
            </div>
            <div className="text-[#e7e9ea] max-w-[300px] font-medium gap-1 flex items-center py-2">
              <span className="flex-1 h-[1px] bg-gray-700"></span>
              <span>or</span>
              <span className="flex-1 h-[1px] bg-gray-700"></span>
            </div>
            <div>
              <SignUpForm />
            </div>
          </div>
          <div className="w-full">
            <h3 className="sm:text-base text-sm mb-[15px]  font-extrabold">
              Already have an account?
            </h3>
            <div>
              <SignInForm />
            </div>
          </div>
        </div>
      </section>
      <div className="text-[#e7e9ea] fixed  bottom-0 p-1 sm:text-base text-xs flex w-full justify-center gap-1">
        Developed with passion by{' '}
        <Link
          href="https://www.linkedin.com/in/aman-rai-292ba1157"
          target="_blank"
          className="text-purple-500  font-medium"
        >
          Aman Rai
        </Link>
      </div>
    </main>
  );
};

export default AuthPage;
