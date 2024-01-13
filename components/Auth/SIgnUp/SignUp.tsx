import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { signUpSchema } from '@/schema/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import BasicInfo from './FormScreens/BasicInfo';
import UserName from './FormScreens/UserName';
import useMultiStepForm from '@/hooks/multiStepForm';
import ProfilePic from './FormScreens/ProfilePic';
import VerifyEmail from './FormScreens/VerifyEmail';
import { GraphQL } from '@/client/api';
import {
  checkUserEmailQuery,
  checkUserNameQuery,
  verifyOTPQuery,
} from '@/graphql/query/user';
import FinalScreen from './FormScreens/FinalScreen';
import {
  createUserMutation,
  generateOTPMutation,
} from '@/graphql/mutation/user';

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  const [isVerified, setIsVerified] = React.useState(false);
  const [accountCreated, setAccountCreated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleNext = async () => {
    switch (currentStepIndex) {
      case 0: {
        const output = await form.trigger(['firstName', 'email', 'password']);
        if (!output) return;
        const email = form.getValues('email') as string;
        const { checkUserEmail: isValid } = await GraphQL.request(
          checkUserEmailQuery,
          {
            email: email,
          }
        );
        console.log('isValid', isValid);
        if (!isValid) {
          form.setError('email', {
            type: 'custom',
            message: 'Email already exists',
          });
          return;
        }
        next();
        break;
      }
      case 1: {
        const output = await form.trigger(['userName']);
        if (!output) return;
        const { checkUserName: isValid } = await GraphQL.request(
          checkUserNameQuery,
          { userName: form.getValues('userName') }
        );
        if (!isValid) {
          form.setError('userName', {
            type: 'custom',
            message: 'Username already exists',
          });
          return;
        }
        next();
        break;
      }
      case 2: {
        await GraphQL.request(generateOTPMutation, {
          to: form.getValues('email'),
        });
        next();
      }
      case 3: {
        const otp = form.getValues('otp');
        if (!otp) return;
        const parseInt = Number(otp);
        if (isNaN(parseInt)) {
          form.setError('otp', {
            type: 'custom',
            message: 'Number only',
          });
          return;
        }

        console.log(parseInt);
        const { verifyOTP } = await GraphQL.request(verifyOTPQuery, {
          to: form.getValues('email'),
          otp: parseInt,
        });
        if (verifyOTP) {
          setIsVerified(true);
          onSubmit(form.getValues());
          goTo(4);
          return;
        } else {
          form.setError('otp', {
            type: 'custom',
            message: 'Invalid OTP',
          });
        }
        console.log('exit');
        return;
      }
      default:
        return;
    }
  };

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    // e.preventDefault();
    try {
      setLoading(true);
      const { createUser } = await GraphQL.request(createUserMutation, {
        payload: {
          firstName: values.firstName,
          lastName: values.lastName,
          userName: values.userName,
          email: values.email,
          password: values.password,
          profilePicUrl: values.profilePicURL,
        },
      });
      if (createUser) {
        setAccountCreated(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const {
    next,
    back,
    goTo,
    currentStep,
    currentStepIndex,
    steps,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm([
    // eslint-disable-next-line react/jsx-key
    <BasicInfo form={form} />,
    // eslint-disable-next-line react/jsx-key
    <UserName form={form} />,
    // eslint-disable-next-line react/jsx-key
    <ProfilePic form={form} />,
    // eslint-disable-next-line react/jsx-key
    <VerifyEmail
      email={form.getValues('email')}
      form={form}
      setIsVerified={setIsVerified}
      isVerified={isVerified}
    />,
  ]);

  const onOpenChange = () => {
    goTo(0);
    form.reset();
  };
  console.log('index', currentStepIndex);
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="font-medium w-full  max-w-[300px] py-2 bg-purple-700 rounded-full">
          Create Account
        </button>
      </DialogTrigger>
      <DialogContent className="p-5  h-fit flex flex-col">
        {currentStepIndex < steps.length && (
          <>
            {' '}
            <div className="relative authpage-title">
              <span className="authpage-title absolute top-0 left-3 text-xlg ">
                Step {currentStepIndex + 1} / {steps.length}
              </span>
            </div>
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 min-h-[500px]  flex flex-col justify-between h-full"
              >
                {currentStep}
                <div className="flex justify-end gap-3">
                  {!isFirstStep && (
                    <Button
                      variant="outline"
                      className="dark:bg-black"
                      type="button"
                      onClick={back}
                    >
                      Back
                    </Button>
                  )}
                  <Button onClick={handleNext} type="button">
                    {isLastStep ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
        {currentStepIndex + 1 > steps.length && (
          <FinalScreen accountCreated={accountCreated} loading={loading} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignUpForm;
