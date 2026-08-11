"use client";

import {
  useEffect,
  useState,
} from "react";

import Box from "@mui/material/Box";

import {
  getProducts,
} from "@/services/product.service";

import ProductCard from "./ProductCard";

import { Product } from "@/types/product";

export default function ProductList() {
  const [products, setProducts] =
    useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts =
      async () => {
        const res =
          await getProducts();

        if (res.success) {
          setProducts(
            res.products
          );
        }
      };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {products.map(
        (product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        )
      )}
    </Box>
  );
}