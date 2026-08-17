"use client";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ChangeEvent, ReactNode } from "react";

interface Props {
  label: string;
  error?: string;
  type?: string;
  register?: any;
  endAdornment?: ReactNode;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputProps?: Record<string, unknown>;
  size?: "small" | "medium";
  sx?: object;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
}

export default function CustomInput({
  label,
  error,
  type = "text",
  register,
  endAdornment,
  value,
  onChange,
  inputProps,
  size = "medium",
  sx,
  placeholder,
  disabled,
  name,
}: Props) {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      error={!!error}
      helperText={error}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      sx={sx}
      {...(register ?? {})}
      slotProps={{
        input: {
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : undefined,
        },
        htmlInput: inputProps,
      }}
    />
  );
}