import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email must be required',
    }),
    password: z.string({
      required_error: 'password must be required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
