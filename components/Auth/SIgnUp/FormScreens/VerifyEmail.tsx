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
import { Button } from '@/components/ui/button';
import useCountDown from '@/hooks/useCountDown';
import { GraphQL } from '@/client/api';
import { verifyOTPQuery } from '@/graphql/query/user';
import { generateOTPMutation } from '@/graphql/mutation/user';

interface VerifyEmailProps {
  form: any;
  email: string;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  isVerified: boolean;
}

const VerifyEmail = (props: Partial<VerifyEmailProps>) => {
  const { form, email, isVerified, setIsVerified } = props;
  const { count, setCount } = useCountDown(60);

  const onResend = async () => {
    await GraphQL.request(generateOTPMutation, {
      to: email!,
    });
    setCount(60);
  };

  const onSubmit = async () => {
    const { verifyOTP } = await GraphQL.request(verifyOTPQuery, {
      to: email!,
      otp: form.getValues('otp'),
    });
    if (verifyOTP) {
      setIsVerified?.(true);
      return;
    } else {
      form.setError('otp', {
        type: 'custom',
        message: 'Invalid OTP',
      });
    }
    return;
  };
  return (
    <FormWrapper title="Email Verification">
      <p className="text-base py-4">
        Verify your email with OTP sent to{' '}
        <span className="italic">{email}</span>
      </p>
      <FormField
        control={form.control}
        name="otp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OTP</FormLabel>
            <FormControl>
              <Input
                className="dark:bg-black"
                placeholder="Enter your OTP"
                {...field}
                type="number"
                max={9999}
              />
            </FormControl>
            <FormDescription>
              <div className="flex justify-end items-center gap-2">
                <div>
                  {Math.floor(count / 60)}:
                  {count - Math.floor(count / 60) * 60 < 10
                    ? `0${count - Math.floor(count / 60) * 60}`
                    : count - Math.floor(count / 60) * 60}
                </div>
                <Button
                  disabled={!!count}
                  type="button"
                  className="text-blue-500"
                  variant={'ghost'}
                  onClick={onResend}
                >
                  Resend OTP
                </Button>
              </div>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormWrapper>
  );
};

export default VerifyEmail;
