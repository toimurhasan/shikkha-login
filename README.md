# Shikkha Login - Sign-In Flow

This project implements a modern sign-in flow using Next.js, React Hook Form, Zod validation, and Material UI.

## Features

- **Step 1:** User enters their email address.
- **Step 2:** User confirms their email and enters their password.
- **Validation:** Email and password are validated using Zod schema.
- **API Integration:** Credentials are sent to `/api/auth/signin` for authentication.
- **Remember Me:** Optionally stores the token in localStorage or sessionStorage based on user choice.
- **Error Handling:** Displays server and validation errors in the UI.

## How It Works

1. **Email Step:**
   - User enters their email.
   - Email is validated for format and presence.
   - On success, proceeds to password step.
2. **Password Step:**
   - User sees their email and enters password.
   - Password is validated for minimum length.
   - On submit, credentials are sent to the API.
   - On success, user is redirected to the dashboard.

- `src/components/form/SignInForm.tsx`: Main sign-in form logic and flow.
- `src/components/field/EmailInput.tsx`: Controlled email input field.
- `src/components/field/PasswordInput.tsx`: Controlled password input with show/hide toggle.
- `src/lib/api.ts`: Handles API requests for sign-in.
- `src/schemas/auth.tsx`: Zod schema for validation.
- `src/types/auth.ts`: Type definitions for sign-in payload and response.
- `src/app/api/auth/signin/route.ts`: Mock API route for sign-in (see below).

## Mock API Route

The sign-in flow uses a mock API route for authentication, defined in `src/app/api/auth/signin/route.ts`:


### Test Credentials

- **Email:** `user@shikkha.dev`
- **Password:** `password123`

Use these credentials to test the sign-in flow. Any other credentials will result in an error message.

## Usage

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Visit `/signin` to use the sign-in flow.

## Customization

- Update validation rules in `src/schemas/auth.tsx` as needed.
- Modify API integration in `src/lib/api.ts` for your backend.

---

For more details, see the source code and comments in each file.
