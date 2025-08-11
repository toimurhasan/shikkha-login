'use client';

import { useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SignInSchemaType } from 'src/schemas/auth';

/**
 * PasswordInput Component
 *
 * A controlled password input field for the Sign-In form, built with
 * Material UI's TextField and integrated with React Hook Form for
 * state management and validation.
 *
 * Features:
 * - Integrates with React Hook Form's `Controller` for form state control.
 * - Displays validation errors automatically based on form state.
 * - Includes a show/hide password toggle using Material UI icons.
 * - Supports Material UI props such as fullWidth and margin.
 *
 * Accessibility:
 * - Properly labeled in Bangla for local user base.
 * - Toggle button includes an accessible icon for visibility state.
 *
 * @component
 * @example
 * ```tsx
 * <PasswordInput control={formControl} />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {Control<SignInSchemaType>} props.control - React Hook Form control object
 * that manages the state and validation for this field.
 *
 * @returns {JSX.Element} A controlled Material UI TextField component bound to the "password" field,
 * with a visibility toggle icon.
 */
export default function PasswordInput({ control }: { control: Control<SignInSchemaType> }) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label="পাসওয়ার্ড"
          type={show ? 'text' : 'password'}
          fullWidth
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow((prev) => !prev)} edge="end">
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
