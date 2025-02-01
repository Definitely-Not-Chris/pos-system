
import { z } from 'zod';

export const RegisterUserSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string()
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>

export const SignInUserSchema = z.object({
  email: z.string(),
  password: z.string()
});

export type SignInUserDto = z.infer<typeof SignInUserSchema>