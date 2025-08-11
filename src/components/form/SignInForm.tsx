'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, SignInSchemaType } from 'src/schemas/auth';
import { signInApi } from 'src/lib/api';
import EmailInput from 'src/components/field/EmailInput';
import PasswordInput from 'src/components/field/PasswordInput';
import { Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';

/**
 * Sign-in form component with validation and API integration.
 */
export default function SignInForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  // Handles final sign-in
  const onSubmit = async (data: SignInSchemaType) => {
    setServerError(null);
    const res = await signInApi(data);
    if (!res.ok) {
      setServerError(res.message || 'পরিচয় সনাক্ত করা যায় নি');
      return;
    }
    if (data.remember) {
      localStorage.setItem('authToken', res.token || '');
    } else {
      sessionStorage.setItem('authToken', res.token || '');
    }
    router.push('/dashboard');
  };

  // handles email step
  const handleEmailNext = () => {
    setServerError(null);
    // email is required
    const email = getValues('email');
    if (!email) {
      setServerError('ইমেইল প্রদান করুন');
      return;
    }
    // Email regex validation
    const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setServerError('সঠিক ইমেইল প্রদান করুন');
      return;
    }

    // Must end with '@shikkha.dev'
    if (!email.endsWith('@shikkha.dev')) {
      setServerError("ইমেইলটি '@shikkha.dev' দিয়ে শেষ হতে হবে");
      return;
    }

    setStep(2);
  };

  return (
    <form
      onSubmit={
        step === 2
          ? handleSubmit(onSubmit)
          : (e) => {
              e.preventDefault();
              handleEmailNext();
            }
      }
    >
      <Stack spacing={2}>
        {serverError && <Alert severity="error"> {serverError}</Alert>}
        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img src="/stack.png" alt="logo" />
            </Box>

            <Box>
              <Typography variant="h5" sx={{ pb: 1 }} component="h1" align="center">
                সাইন-ইন করো
              </Typography>
              <Typography variant="body1" component="h1" align="center">
                তোমার পরিচয় অ্যাকাউন্ট ব্যবহার করো
              </Typography>

              <EmailInput control={control} />
              <Typography variant="subtitle2" color="primary" sx={{ cursor: 'pointer' }}>
                ই-মেইল ঠিকানা ভুলে গেছো?
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ pb: 1 }}>
                তোমার ব্যক্তিগত কম্পিউটার / মোবাইল নয়? তাহলে ব্যক্তিগতভাব সাইন-ইন করতে অতিথি মোড
                ব্যবহার কর।
              </Typography>
              <Typography color="primary" variant="subtitle2" sx={{ cursor: 'pointer' }}>
                'গেস্ট' মোড ব্যবহার সম্পর্কে আরো জানো
              </Typography>
            </Box>
            <Stack direction={'row'} spacing={1} justifyContent="flex-end">
              <Button type="button" variant="text">
                অ্যাকাউন্ট তৈরী করো
              </Button>
              <Button type="button" variant="contained" onClick={handleEmailNext}>
                পরবর্তী
              </Button>
            </Stack>
          </>
        )}

        {/* Step 2: Show user image, email, and prompt for password */}
        {step === 2 && (
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
                <img
                  src="/account.png"
                  alt="User"
                  style={{ borderRadius: '50%', display: 'block' }}
                />
              </Box>
              <Typography variant="h6" align="center" sx={{ mb: 1 }}>
                প্রদর্শিত নাম
              </Typography>
              <Chip
                label={getValues('email')}
                onDelete={() => setStep(1)}
                deleteIcon={<CloseIcon />}
                sx={{
                  backgroundColor: '#E6F0FF', // Light blue background
                  color: '#1A3E72', // Dark blue text
                  fontWeight: 'bold',
                  borderRadius: '16px', // Rounded shape
                  paddingX: '4px', // Horizontal padding
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
            <Stack direction={'row'} spacing={1} justifyContent="end" alignItems="center">
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
        )}
      </Stack>
    </form>
  );
}
