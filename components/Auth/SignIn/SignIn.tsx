import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AiOutlineReload } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signInSchema } from '@/schema/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { GraphQL } from '@/client/api';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import FormWrapper from '../SIgnUp/Wrapper/Wrapper';
import { FaRegEyeSlash } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { signInQuery } from '@/graphql/query/user';

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const [changeType, setChangeType] = React.useState('password');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      setLoading(true);
      const res = await GraphQL.request(signInQuery, {
        email: values.email,
        password: values.password,
      });
      if (!res.signInUser) throw new Error('Something went wrong');
      const signInUser = res.signInUser;
      window.localStorage.setItem('__hashtag_token', `${signInUser}`);
      GraphQL.setHeaders({ Authorization: `Bearer ${signInUser}` });
      router.push('/home');
    } catch (error: any) {
      console.log(error);
      form.setError('password', {
        type: 'custom',
        message: 'Invalid email or password',
      });
    } finally {
      setLoading(false);
    }
  };

  const onOpenChange = () => {
    form.reset();
    setChangeType('password');
    setLoading(false);
  };
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="font-medium w-full max-w-[300px] py-2 bg-transparent border-[1px] border-[#e7e9ea] text-purple-700 hover:bg-purple-700/10 rounded-full">
          Sign in
        </button>
      </DialogTrigger>
      <DialogContent className="p-5  h-fit flex flex-col">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 min-h-[500px]  flex flex-col justify-between h-full"
          >
            <FormWrapper title="Sign In">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-black"
                        required
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{' '}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center relative">
                        {changeType === 'password' ? (
                          <FaRegEyeSlash
                            onClick={() => setChangeType('text')}
                            className="absolute  cursor-pointer right-3 top-3"
                          />
                        ) : (
                          <FaRegEye
                            onClick={() => setChangeType('password')}
                            className="absolute cursor-pointer right-3 top-3"
                          />
                        )}
                        <Input
                          className="dark:bg-black"
                          required
                          placeholder="Enter your password"
                          type={changeType}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                {' '}
                <Button disabled={loading} type="submit">
                  {loading && (
                    <AiOutlineReload className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>{' '}
            </FormWrapper>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInForm;
