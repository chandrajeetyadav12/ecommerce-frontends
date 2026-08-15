"use client";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ReactNode } from "react";

interface Props {
  label: string;
  error?: string;
  type?: string;
  register?: any;
   endAdornment?: ReactNode;
}

export default function CustomInput({
  label,
  error,
  type = "text",
  register,
  endAdornment
}: Props) {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      error={!!error}
      helperText={error}
      {...register}
      slotProps={{
        input: {
          endAdornment: endAdornment ? (
            <InputAdornment position="end">
              {endAdornment}
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}