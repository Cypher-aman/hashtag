import { z } from 'zod';
import debounce from 'lodash/debounce';
import { GraphQL } from '@/client/api';
import { checkUserNameQuery } from '@/graphql/query/user';

const debouncedCheckUsernameAvailability = debounce(
  async (userName: string) => {
    return await GraphQL.request(checkUserNameQuery, { userName });
  },
  500
);

/*.superRefine((v, ctx) => {
      if (v.mobile || v.phone) return true;
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must add at least one contact number.",
        path: ["mobile"],
      });*/

const usernameSchema = z
  .string()
  .min(5, { message: 'Username must be at least 5 characters' })
  .refine(
    async (value) => {
      const check = await debouncedCheckUsernameAvailability(value);
      return check?.checkUserName;
    },
    {
      message: 'Username is already taken',
    }
  );

export const userSchema = z.object({
  userName: usernameSchema, // Existing username schema
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2).optional(),
  bio: z.string().max(200).optional(),
});
