"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";

import { getMySellerProfile } from "@/services/seller.service";

export default function SellerProfile() {
  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);



useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getMySellerProfile();
      setProfile(res.data.profile);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", 
            alignItems: "center",
            height: "100vh",
        }}
        
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Typography>
        No Seller Profile Found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 4,
      }}
    >
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
          >
            Seller Profile
          </Typography>

          <Typography>
            <strong>
              Shop Name:
            </strong>{" "}
            {profile.shopName}
          </Typography>

          <Typography>
            <strong>
              GST Type:
            </strong>{" "}
            {profile.gstType}
          </Typography>

          <Typography>
            <strong>
              GST Number:
            </strong>{" "}
            {profile.gstNumber}
          </Typography>

          <Typography>
            <strong>
              PAN Number:
            </strong>{" "}
            {profile.panNumber}
          </Typography>

          <Typography sx={{ mt: 3 }}>
            <strong>
              Verification:
            </strong>
          </Typography>

          <Chip
            label={
              profile.verificationStatus
            }
            color={
              profile.verificationStatus ===
              "approved"
                ? "success"
                : profile.verificationStatus ===
                  "rejected"
                ? "error"
                : "warning"
            }
          />

          <Typography
            variant="h6"
            sx={{ mt: 3 }}
          >
            Pickup Address
          </Typography>

          <Typography>
            {
              profile.pickupAddress
                ?.addressLine1
            }
          </Typography>

          <Typography>
            {
              profile.pickupAddress
                ?.addressLine2
            }
          </Typography>

          <Typography>
            {
              profile.pickupAddress
                ?.city
            }
            ,
            {
              profile.pickupAddress
                ?.state
            }
          </Typography>

          <Typography>
            {
              profile.pickupAddress
                ?.pincode
            }
          </Typography>

          <Typography
            variant="h6"
          >
            Bank Details
          </Typography>

          <Typography>
            Account Holder:
            {" "}
            {
              profile.bankDetails
                ?.accountHolderName
            }
          </Typography>

          <Typography>
            Account Number:
            {" "}
            {
              profile.bankDetails
                ?.accountNumber
            }
          </Typography>

          <Typography>
            IFSC:
            {" "}
            {
              profile.bankDetails
                ?.ifscCode
            }
          </Typography>

          <Typography>
            Bank:
            {" "}
            {
              profile.bankDetails
                ?.bankName
            }
          </Typography>

          <Typography
            variant="h6"
           
          >
            Documents
          </Typography>

          <Typography>
            <a
              href={
                profile.documents
                  ?.panCard
              }
              target="_blank"
            >
              PAN Card
            </a>
          </Typography>

          <Typography>
            <a
              href={
                profile.documents
                  ?.aadhaarCard
              }
              target="_blank"
            >
              Aadhaar Card
            </a>
          </Typography>

          <Typography>
            <a
              href={
                profile.documents
                  ?.gstCertificate
              }
              target="_blank"
            >
              GST Certificate
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}