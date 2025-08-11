'use client';

import { Container, Box, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignInForm from 'src/components/form/SignInForm';

const defaultTheme = createTheme();

/**
 * SignInPage Component
 *
 * This component serves as the entry point for the user sign-in process,
 * providing a styled layout and theming context for the SignInForm component.
 *
 * Features:
 * - Wraps the sign-in form inside Material UI's ThemeProvider with a default theme,
 *   enabling consistent theming across the form and its child components.
 * - Uses MUI's Container and Box components to center the form vertically and horizontally.
 * - Uses maxWidth="xs" on the Container to center the component within the screen,
 *   optimizing for small screen widths to improve usability on mobile devices.
 * - Encapsulates the SignInForm within a Paper component with padding and rounded corners,
 *   providing a clean and focused card-like UI.
 * - Applies a light grey background (`grey.100`) to the entire page for subtle contrast.
 *
 * This component does not manage any state itself but relies on the child SignInForm
 * for all authentication-related logic.
 *
 * @component
 *
 * @returns {JSX.Element} A themed, responsive page layout containing the SignInForm.
 *
 * @example
 * ```tsx
 * import SignInPage from 'src/pages/signin';
 *
 * export default function App() {
 *   return <SignInPage />;
 * }
 * ```
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
