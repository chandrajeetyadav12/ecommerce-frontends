"use client";

import TextField from "@mui/material/TextField";

interface Props {
  label: string;
  error?: string;
  type?: string;
  register?: any;
}

export default function CustomInput({
  label,
  error,
  type = "text",
  register,
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
    />
  );
}