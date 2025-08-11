# Shikkha Login - Sign-In Flow

This project implements a modern sign-in flow using Next.js, React Hook Form, Zod validation, and Material UI.

## Features

- **Step 1:** User enters their email address.
- **Step 2:** User confirms their email and enters their password.
- **Validation:** Email and password are validated using Zod schema.
- **API Integration:** Credentials are sent to `/api/auth/signin` for authentication.
- **Remember Me:** Optionally stores the token in localStorage or sessionStorage based on user choice.
- **Error Handling:** Displays server and validation errors in the UI.

## Key Files

- `src/components/form/SignInForm.tsx`: Main sign-in form logic and flow.
- `src/components/field/EmailInput.tsx`: Controlled email input field.
- `src/components/field/PasswordInput.tsx`: Controlled password input with show/hide toggle.
- `src/lib/api.ts`: Handles API requests for sign-in.
- `src/schemas/auth.tsx`: Zod schema for validation.
- `src/types/auth.ts`: Type definitions for sign-in payload and response.
- `src/app/api/auth/signin/route.ts`: Mock API route for sign-in (see below).

## Mock API Route

The sign-in flow uses a mock API route for authentication, defined in `src/app/api/auth/signin/route.ts`

### Test Credentials

- **Email:** `user@shikkha.dev`
- **Password:** `password123`

Use these credentials to test the sign-in flow. Any other credentials will result in an error message.

## Setup & Run Instructions

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Visit `http://localhost:8082/signin` in your browser to use the sign-in flow.

## Assumptions Made

- The sign-in flow is for demonstration and testing purposes only.
- Only users with emails ending in `@shikkha.dev` are allowed to sign in.
- The mock API route accepts only one test credential:
  - Email: `user@shikkha.dev`
  - Password: `password123`
- No real authentication or user database is implemented.

## Auth Flow Explanation

1. **Email Step:**
   - User enters their email address.
   - Email is validated for format and must end with `@shikkha.dev`.
   - If valid, proceeds to password step.
2. **Password Step:**
   - User enters their password.
   - Password is validated for minimum length.
   - Credentials are sent to the mock API route.
   - On success, token is stored and user is redirected to the dashboard.
   - On failure, error message is shown.

## Time Taken

- Initial implementation: ~3 hours
- README and documentation: ~30 minutes

## Notes & Learning Reflection

This assessment was completed within the 3-day timeframe.

As TypeScript and Next.js are not my primary stack (my background is in MERN), I dedicated time to learning their fundamentals alongside the implementation. My approach included:

1. Reviewing the provided base template and architecture.
2. Refreshing knowledge of React Hook Form, exploring the Zod validation library, understanding MUI component patterns, and practicing TypeScript typing.
3. Making sure I understand each line of code I write in the Sign-In flow, and not mindlessly copying solutions from external sources.

Even though I could not complete the bonus features due to time constraints, I am confident my development speed will increase as I continue working with Next.js and TypeScript.

---

For more details, see the source code and comments in each file.
