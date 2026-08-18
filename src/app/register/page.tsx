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
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import CustomInput from "@/components/common/CustomInput";

import { registerUser } from "@/services/auth.service";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] =
    useState(false);

  const showAlert = (message: string) => {
    if (typeof window !== "undefined") {
      window.alert(message);
    }
  };
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

      if (!res.success) {
        showAlert(
          res.message ||
            "Registration failed"
        );
        return;
      }

      showAlert(
        res.message ||
          "Registered successfully"
      );
      router.push("/login");
    } catch (error) {
      const apiError = error as ApiError;
      const message =
        apiError.response?.data?.message ||
        "Something went wrong";

      showAlert(message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 5 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 460,
          border: "1px solid #d0d7de",
          borderRadius: 3,
          p: { xs: 2.5, sm: 4 },
          bgcolor: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: "center" }}>
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Name"
            register={register("name")}
            error={errors.name?.message}
          />

          <CustomInput
            label="Email"
            register={register("email")}
            error={errors.email?.message}
          />

          <CustomInput
            label="Password"
            type={showPassword ? "text" : "password"}
            register={register("password")}
            error={errors.password?.message}
            endAdornment={
              <IconButton
                type="button"
                edge="end"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            }
          />

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account? {" "}
          <Link
            href="/login"
            style={{
              color: "#1976d2",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}