'use client';

import { Container, Typography, Box, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignInForm from 'src/components/form/SignInForm';

const defaultTheme = createTheme();

/**
 * Sign-in page layout.
 */
export default function SignInPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ bgcolor: 'grey.100' }}>
        <Container
          maxWidth="xs"
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ p: 2, borderRadius: 3, width: '100%' }} elevation={0}>
              {/* sign in form */}
              <SignInForm />
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
