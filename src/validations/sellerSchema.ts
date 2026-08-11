import { z } from "zod";

export const sellerSchema = z.object({
  shopName: z.string().min(3),

  gstType: z.string().min(1),

  gstNumber: z.string().min(1),

  panNumber: z.string().min(1),

  addressLine1: z.string().min(1),

  addressLine2: z.string(),

  city: z.string().min(1),

  state: z.string().min(1),

  pincode: z.string().min(6),

  accountHolderName: z.string().min(1),

  accountNumber: z.string().min(1),

  ifscCode: z.string().min(1),

  bankName: z.string().min(1),
});

export type SellerFormData =
  z.infer<typeof sellerSchema>;