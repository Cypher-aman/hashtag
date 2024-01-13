import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import FormWrapper from '../Wrapper/Wrapper';

interface UserName {
  userName: string;
}

interface UserNameProps extends UserName {
  form: any;
}

const UserName = (props: Partial<UserNameProps>) => {
  const { form } = props;
  return (
    <FormWrapper title="Choose a username">
      <FormField
        control={form.control}
        name="userName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                className="dark:bg-black"
                placeholder="Enter your username"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Username must be minimum 5 characters long
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormWrapper>
  );
};

export default UserName;
