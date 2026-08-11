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
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
export default function LoginPage() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => state.auth.user
  );
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
      console.log(res);
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
    <Container maxWidth="sm">
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
        >
          Login
        </Button>
      </form>
    </Container>
  );
}