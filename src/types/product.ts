// src/types/product.ts

export interface Product {
  _id: string;

  sellerId: {
    _id: string;
    name: string;
    email: string;
  };

  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;

  images: string[];

  status:
    | "pending"
    | "approved"
    | "rejected";

  createdAt: string;
  updatedAt: string;
}