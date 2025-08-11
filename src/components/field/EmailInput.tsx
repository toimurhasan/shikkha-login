'use client';

import { Controller, Control } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { SignInSchemaType } from 'src/schemas/auth';

/**
 * EmailInput Component
 *
 * A controlled email input field designed specifically for the Sign-In form,
 * built with Material UI's TextField and integrated with React Hook Form for state
 * management and validation. This component adheres to the SignInSchemaType definition
 * to ensure type safety and proper validation rules are applied.
 *
 * Features:
 * - Integrates with React Hook Form via the Controller component.
 * - Displays validation errors automatically based on form state.
 * - Supports Material UI props such as fullWidth, margin, and placeholder.
 * - Uses schema-based typing to prevent invalid field names or types.
 *
 * Accessibility:
 * - Includes proper label text in Bangla for target users.
 *
 * @component
 * @example
 * ```tsx
 * <EmailInput control={formControl} />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {Control<SignInSchemaType>} props.control - The React Hook Form control object
 * that manages the state and validation for this input field.
 *
 * @returns {JSX.Element} A controlled Material UI TextField component bound to the "email" field.
 */

export default function EmailInput({ control }: { control: Control<SignInSchemaType> }) {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label="ইমেইল ঠিকানা"
          placeholder="@shikkha.dev"
          type="email"
          fullWidth
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
