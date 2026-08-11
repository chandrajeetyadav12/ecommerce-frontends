"use client";

import {
  useState,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  sellerSchema,
  SellerFormData,
} from "@/validations/sellerSchema";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import CustomInput from "../common/CustomInput";

import FileUpload from "../common/FileUpload";

import { createSellerProfile } from "@/services/seller.service";

export default function SellerForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerFormData>({
    resolver:
      zodResolver(sellerSchema),
  });

  const [panCard, setPanCard] =
    useState<File | null>(null);

  const [
    aadhaarCard,
    setAadhaarCard,
  ] = useState<File | null>(null);

  const [
    gstCertificate,
    setGstCertificate,
  ] = useState<File | null>(null);

  const onSubmit = async (
    data: SellerFormData
  ) => {
    try {
      const formData =
        new FormData();

      Object.entries(data).forEach(
        ([key, value]) => {
          formData.append(
            key,
            value
          );
        }
      );

      if (panCard) {
        formData.append(
          "panCard",
          panCard
        );
      }

      if (aadhaarCard) {
        formData.append(
          "aadhaarCard",
          aadhaarCard
        );
      }

      if (gstCertificate) {
        formData.append(
          "gstCertificate",
          gstCertificate
        );
      }

      const res =
        await createSellerProfile(
          formData
        );

      console.log(res);
          if (res.success) {
            alert(
              "Seller profile created successfully"
            );
      router.push("/");
      
      // router.push("/seller/pending");
    }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography
      
        sx={{ mt: 3 }}
      >
        Seller Registration
      </Typography>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
      >
        <CustomInput
          label="Shop Name"
          register={register(
            "shopName"
          )}
          error={
            errors.shopName?.message
          }
        />

        <CustomInput
          label="GST Type"
          register={register(
            "gstType"
          )}
          error={
            errors.gstType?.message
          }
        />

        <CustomInput
          label="GST Number"
          register={register(
            "gstNumber"
          )}
          error={
            errors.gstNumber?.message
          }
        />

        <CustomInput
          label="PAN Number"
          register={register(
            "panNumber"
          )}
          error={
            errors.panNumber?.message
          }
        />

        <CustomInput
          label="Address Line 1"
          register={register(
            "addressLine1"
          )}
          error={
            errors.addressLine1
              ?.message
          }
        />

        <CustomInput
          label="Address Line 2"
          register={register(
            "addressLine2"
          )}
        />

        <CustomInput
          label="City"
          register={register(
            "city"
          )}
          error={
            errors.city?.message
          }
        />

        <CustomInput
          label="State"
          register={register(
            "state"
          )}
          error={
            errors.state?.message
          }
        />

        <CustomInput
          label="Pincode"
          register={register(
            "pincode"
          )}
          error={
            errors.pincode?.message
          }
        />

        <CustomInput
          label="Account Holder"
          register={register(
            "accountHolderName"
          )}
          error={
            errors
              .accountHolderName
              ?.message
          }
        />

        <CustomInput
          label="Account Number"
          register={register(
            "accountNumber"
          )}
          error={
            errors
              .accountNumber?.message
          }
        />

        <CustomInput
          label="IFSC Code"
          register={register(
            "ifscCode"
          )}
          error={
            errors.ifscCode
              ?.message
          }
        />

        <CustomInput
          label="Bank Name"
          register={register(
            "bankName"
          )}
          error={
            errors.bankName
              ?.message
          }
        />

        <FileUpload
          label="PAN Card"
          onChange={setPanCard}
        />

        <FileUpload
          label="Aadhaar Card"
          onChange={
            setAadhaarCard
          }
        />

        <FileUpload
          label="GST Certificate"
          onChange={
            setGstCertificate
          }
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}