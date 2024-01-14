import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useCallback } from 'react';
import FormWrapper from '../Wrapper/Wrapper';
import toast from 'react-hot-toast';
import { GraphQL } from '@/client/api';
import {
  getPresignerURLForSignUpQuery,
  getPresignerURLQuery,
} from '@/graphql/query/post';
import axios from 'axios';
import Image from 'next/image';
import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';

interface ProfilePicProps {
  form: any;
}

const ProfilePic = (props: Partial<ProfilePicProps>) => {
  const { form } = props;
  const [image, setImage] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      setUploading(true);
      toast.loading('Uploading...', { id: '4' });
      const { getPresignerURLForSignUp: url } = await GraphQL.request(
        getPresignerURLForSignUpQuery,
        {
          imageType: file.type,
          imageName: file.name,
          email: form.getValues('email'),
        }
      );
      if (!url) throw new Error('Failed to upload image');
      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      setImage(url.split('?')[0]);
      form?.setValue('profilePicURL', url.split('?')[0]);
      toast.success('Profile picture uploaded successfully', { id: '4' });
    } catch (error) {
      toast.error('Failed to upload image', { id: '4' });
    } finally {
      setUploading(false);
    }
  }, []);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files?.[0];
    if (!file) return;
    await handleImageUpload(file);
  };
  return (
    <FormWrapper title="Profile Picture">
      <div className="flex flex-col items-center">
        {image ? (
          <Image
            src={image}
            alt="Profile picture"
            width={180}
            height={180}
            objectFit="cover"
            className="rounded-full"
          />
        ) : (
          <div className="w-[180px] h-[180px] rounded-full flex justify-center items-center bg-slate-300">
            {uploading && <LoadingSpinner />}
          </div>
        )}
        <FormField
          name="Upload an image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  id="picture"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="dark:bg-black"
                  placeholder="Upload your profile pic"
                  {...field}
                  onChange={(event) => handleImageChange(event)}
                />
              </FormControl>
              <FormDescription>
                You can change this image later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormWrapper>
  );
};

export default ProfilePic;
