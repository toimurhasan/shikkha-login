'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, SignInSchemaType } from 'src/schemas/auth';
import { signInApi } from 'src/lib/api';
import EmailInput from 'src/components/field/EmailInput';
import PasswordInput from 'src/components/field/PasswordInput';
import { Alert, Box, Button, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Step 1: Email Entry Component
 */
function EmailStep({
  control,
  serverError,
  onNext,
}: {
  control: Control<SignInSchemaType>;
  serverError: string | null;
  onNext: () => void;
}) {
  return (
    <>
      {serverError && <Alert severity="error">{serverError}</Alert>}

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img src="/stack.png" alt="logo" />
      </Box>

      <Box>
        <Typography variant="h5" sx={{ pb: 1 }} align="center">
          সাইন-ইন করো
        </Typography>
        <Typography variant="body1" align="center">
          তোমার পরিচয় অ্যাকাউন্ট ব্যবহার করো
        </Typography>

        <EmailInput control={control} />

        <Typography variant="subtitle2" color="primary" sx={{ cursor: 'pointer' }}>
          ই-মেইল ঠিকানা ভুলে গেছো?
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ pb: 1 }}>
          তোমার ব্যক্তিগত কম্পিউটার / মোবাইল নয়? তাহলে ব্যক্তিগতভাব সাইন-ইন করতে অতিথি মোড ব্যবহার
          কর।
        </Typography>
        <Typography color="primary" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          'গেস্ট' মোড ব্যবহার সম্পর্কে আরো জানো
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="text">অ্যাকাউন্ট তৈরী করো</Button>
        <Button variant="contained" onClick={onNext}>
          পরবর্তী
        </Button>
      </Stack>
    </>
  );
}

/**
 * Step 2: Password Entry Component
 */
function PasswordStep({
  control,
  email,
  onBack,
  isSubmitting,
}: {
  control: Control<SignInSchemaType>;
  email: string;
  onBack: () => void;
  isSubmitting: boolean;
}) {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            border: '2px solid #dfe2e7',
            borderRadius: '50%',
            padding: '2px',
            display: 'inline-block',
            marginBottom: 1,
          }}
        >
          <img src="/account.png" alt="User" style={{ borderRadius: '50%', display: 'block' }} />
        </Box>
        <Typography variant="h6" align="center" sx={{ mb: 1 }}>
          প্রদর্শিত নাম
        </Typography>
        <Chip
          label={email}
          onDelete={onBack}
          deleteIcon={<CloseIcon />}
          sx={{
            backgroundColor: '#E6F0FF',
            color: '#1A3E72',
            fontWeight: 'bold',
            borderRadius: '16px',
            px: '4px',
            '& .MuiChip-deleteIcon': {
              color: '#1A3E72',
              '&:hover': {
                color: '#0D1E3F',
              },
            },
          }}
        />
      </Box>

      <PasswordInput control={control} />

      <Stack direction="row" spacing={1} justifyContent="end" alignItems="center">
        <Button variant="text">পাসওয়ার্ড মনে নেই?</Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? 'অপেক্ষা করুন...' : 'পরবর্তী'}
        </Button>
      </Stack>
    </>
  );
}

/**
 * SignInForm Component
 *
 * This component implements a two-step sign-in flow with integrated client-side validation
 * and server-side authentication using a REST API.
 *
 * Step 1: Email Collection and Validation
 * - Collects the user's email address.
 * - Validates email format using a regex pattern.
 * - Enforces domain restriction to only allow emails ending with "@shikkha.dev".
 * - Displays localized error messages in Bangla for invalid input.
 *
 * Step 2: Password Entry and Authentication
 * - Displays the provided email with an option to return to the email input step.
 * - Prompts for password input with controlled visibility toggle.
 * - Submits the email and password to the authentication API endpoint.
 * - Handles server responses, displaying error messages or redirecting on success.
 *
 * Additional Features:
 * - Uses React Hook Form with Zod schema resolver for form state management and validation.
 * - Utilizes Material UI components for consistent and responsive UI.
 * - Shows loading state and disables the submit button while awaiting API response.
 * - Manages UI error state for both client and server validation feedback.
 * - Navigates to the "/dashboard" page upon successful sign-in.
 *
 * @component
 *
 * @returns {JSX.Element} A fully functional, validated sign-in form with stepwise input and API integration.
 *
 * @example
 * ```tsx
 * import SignInForm from 'src/components/SignInForm';
 *
 * export default function SignInPage() {
 *   return <SignInForm />;
 * }
 * ```
 */

export default function SignInForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleEmailNext = () => {
    setServerError(null);
    const email = getValues('email');
    const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;

    if (!email) return setServerError('ইমেইল প্রদান করুন');
    if (!emailRegex.test(email)) return setServerError('সঠিক ইমেইল প্রদান করুন');
    if (!email.endsWith('@shikkha.dev'))
      return setServerError("ইমেইলটি '@shikkha.dev' দিয়ে শেষ হতে হবে");

    setStep(2);
  };

  const onSubmit = async (data: SignInSchemaType) => {
    setServerError(null);
    const res = await signInApi(data);

    if (!res.ok) {
      setServerError(res.message || 'পরিচয় সনাক্ত করা যায় নি');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <form onSubmit={step === 2 ? handleSubmit(onSubmit) : (e) => e.preventDefault()}>
      <Stack spacing={2}>
        {step === 1 && (
          <EmailStep control={control} serverError={serverError} onNext={handleEmailNext} />
        )}

        {step === 2 && (
          <>
            {serverError && <Alert severity="error">{serverError}</Alert>}
            <PasswordStep
              control={control}
              email={getValues('email')}
              onBack={() => setStep(1)}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </Stack>
    </form>
  );
}
