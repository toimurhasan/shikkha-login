import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().min(1, 'ইমেইল প্রদান করুন').email('সঠিক ইমেইল প্রদান করুন'),
  password: z.string().min(7, 'পাসওয়ার্ড অবশ্যই ৬ অক্ষরের বেশি হতে হবে'),
  remember: z.boolean().optional(),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
