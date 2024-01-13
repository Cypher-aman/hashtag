import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormWrapper from '../Wrapper/Wrapper';
import React from 'react';

interface BasicInfo {
  firstName: string;
  lastName: string;
  email: string;
}

interface BasicInfoProps extends BasicInfo {
  form: any;
}

const BasicInfo = (props: Partial<BasicInfoProps>) => {
  const { form } = props;
  return (
    <FormWrapper title="Basic Info">
      <div className="flex gap-2 w-full">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-black"
                  required
                  placeholder="Enter your first name"
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
            <FormItem className="w-full">
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-black"
                  placeholder="Enter your last name"
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                className="dark:bg-black"
                placeholder="Enter your email"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                className="dark:bg-black"
                placeholder="Enter your password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormWrapper>
  );
};

export default BasicInfo;
