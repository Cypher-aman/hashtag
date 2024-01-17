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
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

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

  const [changeType, setChangeType] = React.useState('password');
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
                  className="dark:bg-modalGray"
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
                  className="dark:bg-modalGray"
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
                className="dark:bg-modalGray"
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
                  className="dark:bg-modalGray"
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
    </FormWrapper>
  );
};

export default BasicInfo;
