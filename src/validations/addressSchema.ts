// src/validations/addressSchema.ts

import { z } from "zod";

export const addressSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name is required"),

  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter valid phone number"
    ),

  addressLine1: z
    .string()
    .min(
      5,
      "Address is required"
    ),

  addressLine2:
    z.string().optional(),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  pincode: z
    .string()
    .regex(
      /^\d{6}$/,
      "Enter valid pincode"
    ),

  landmark:
    z.string().optional(),

  addressType: z.enum([
    "home",
    "office",
  ]),
});

export type AddressFormData =
  z.infer<
    typeof addressSchema
  >;