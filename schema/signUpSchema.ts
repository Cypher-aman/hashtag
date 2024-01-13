import * as z from 'zod';

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  userName: z
    .string()
    .min(5, { message: 'Username must be at least 5 characters' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' }),
  profilePicURL: z.string().optional(),
  otp: z.coerce.number(),
});
