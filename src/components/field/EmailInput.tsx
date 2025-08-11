"use client";

import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

/**
 * Controlled email input for sign-in form.
 */
export default function EmailInput({ control }: { control: any }) {
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
