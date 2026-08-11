"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/redux/hooks";

import { setUser } from "@/redux/slices/authSlice";

import { getProfile } from "@/services/auth.service";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getProfile();

        if (res.success) {
          dispatch(setUser(res.user));
        }
      } catch (error) {
        console.log("User not logged in");
      }
    };

    loadUser();
  }, [dispatch]);

  return null;
}