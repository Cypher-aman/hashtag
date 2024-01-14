'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { userSchema } from '@/schema/profileSchema';
import { z } from 'zod';
import { User } from '@/gql/graphql';
import { AiOutlineReload } from 'react-icons/ai';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { updateProfileMutation } from '@/graphql/mutation/user';
import { GraphQL } from '@/client/api';
import toast from 'react-hot-toast';
import { checkUserNameQuery } from '@/graphql/query/user';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const EditProfile = ({ user }: { user: User }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userSchema = z.object({
    userName: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters' }),
    firstName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z.string().min(2).optional(),
    bio: z.string().max(200).optional(),
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: user?.userName || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      bio: user?.bio || '',
    },
  });

  const [isUpdating, setIsUpdating] = React.useState(false);

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      const isAvailable = await GraphQL.request(checkUserNameQuery, {
        userName: values.userName,
      });
      if (!isAvailable.checkUserName && values.userName !== user?.userName) {
        toast.error('Username already taken');
        return;
      }
      setIsUpdating(true);
      await GraphQL.request(updateProfileMutation, {
        payload: {
          firstName: values.firstName,
          lastName: values.lastName,
          userName: values.userName,
          bio: values.bio,
        },
      });
      toast.success('Profile updated successfully');
      router.replace(`/${values.userName}`);
      await queryClient.invalidateQueries({
        queryKey: ['user_info'],
      });
    } catch (error: any) {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-3 py-1 border border-[#536471] rounded-full text-[#EFF3F4]">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-900"
                        placeholder="John"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-900"
                        placeholder="Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="dark:bg-gray-900"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="dark:bg-gray-900 resize-none"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isUpdating} type="submit">
                {isUpdating ? (
                  <>
                    <AiOutlineReload className="mr-2 h-4 w-4 animate-spin" />{' '}
                    <span>Saving</span>
                  </>
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
