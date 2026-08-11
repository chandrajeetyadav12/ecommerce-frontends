import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name is required"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  category: z
    .string()
    .min(2, "Category is required"),

  price: z
    .number()
    .min(1, "Price must be greater than 0"),

  stock: z
    .number()
    .min(0, "Stock cannot be negative"),
});

export type ProductFormData =
  z.infer<typeof productSchema>;