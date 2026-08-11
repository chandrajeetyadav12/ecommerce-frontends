"use client";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterFormData,
} from "@/validations/authSchema";



import CustomInput from "@/components/common/CustomInput";

import { registerUser } from "@/services/auth.service";
import { Box, Button, Typography } from "@mui/material";
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      const res =
        await registerUser(data);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
      >
        Register
      </Typography>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
      >
        <CustomInput
          label="Name"
          register={register(
            "name"
          )}
          error={
            errors.name?.message
          }
        />

        <CustomInput
          label="Email"
          register={register(
            "email"
          )}
          error={
            errors.email?.message
          }
        />

        <CustomInput
          label="Password"
          type="password"
          register={register(
            "password"
          )}
          error={
            errors.password?.message
          }
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
}