"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Container,
} from "@mui/material";

import ProfileInfo from "@/components/profile/ProfileInfo";

import PageLoader from "@/components/common/PageLoader";

import {
  getProfile,
} from "@/services/auth.service";

export default function CustomerProfilePage() {
  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<unknown>(null);


  useEffect(() => {
    async function fetchProfile() {

      try {
        const res =
          await getProfile();

        if (res.success) {
          setUser(res.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading)
    return <PageLoader />;

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4 }}
    >
      <ProfileInfo user={user} />
    </Container>
  );
}