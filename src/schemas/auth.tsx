import { z } from 'zod';

/**
 * Validation schema for Sign-In form inputs.
 *
 * - `email`: required, must be a valid email format.
 * - `password`: required, minimum 7 characters.
 */
export const SignInSchema = z.object({
  email: z.string().min(1, 'ইমেইল প্রদান করুন').email('সঠিক ইমেইল প্রদান করুন'),
  password: z.string().min(7, 'পাসওয়ার্ড অবশ্যই ৬ অক্ষরের বেশি হতে হবে'),
});

/**
 * TypeScript type inferred from SignInSchema,
 * representing the shape of the validated sign-in data.
 */
export type SignInSchemaType = z.infer<typeof SignInSchema>;
