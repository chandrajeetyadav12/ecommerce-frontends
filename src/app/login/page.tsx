"use client";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormData,
} from "@/validations/authSchema";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import CustomInput from "@/components/common/CustomInput";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks";
import Box from "@mui/material/Box";
import Link from "next/link";
export default function LoginPage() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => state.auth.user
  );
  const [showPassword, setShowPassword] =
  useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      router.replace("/admin/dashboard");
    } else if (user.role === "seller" &&
      user.status === "approved") {
      router.replace("/seller/dashboard");
    } else {
      router.replace("/customer/dashboard");
    }
  }, [user, router]);
  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const res = await loginUser(data);
     
       if (!res.success) return;
      if (res.status === 200) {
        console.log("Login successful");
      }
      if (res.success) {
        dispatch(setUser(res.user));

        console.log("Redux Updated");
      }
      if (res.user.role === "admin") {
        router.replace("/admin/dashboard");
      } else if (
        res.user.role === "seller" &&
        res.user.status === "approved"
      ) {
        router.replace("/seller/dashboard");
      }
      if (
        res.user.role === "seller" &&
        res.user.status === "pending"
      ) {
        router.push("/seller/pending");
      }
      else if (res.user.role === "customer") {
        router.replace("/customer/dashboard");
      }
  
      else {
        router.push("/");
      }
    }
    catch (err) {
      console.error(err);
    }
    console.log(data);
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
      >
        Login
      </Typography>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
      >
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
          type={
            showPassword
              ? "text"  
            : "password"
          }
          register={register(
            "password"
          )}
          error={
            errors.password?.message
          }
            endAdornment={
    <IconButton
      type="button"
      edge="end"
      onClick={() =>
        setShowPassword(
          (prev) => !prev
        )
      }
    >
      {showPassword ? (
        <FaEyeSlash />
      ) : (
        <FaEye />
      )}
    </IconButton>
  }
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
        >
          Login
        </Button>
      </form>
      <Typography
  align="center"
  sx={{ mt: 2 }}
>
  First time here?{" "}
  <Link
    href="/register"
    style={{
      color: "#1976d2",
      textDecoration: "none",
      fontWeight: 600,
    }}
  >
    Create an account
  </Link>
</Typography>
    </Box>
  );
}