"use client";

import {
  useEffect,
  useState,
} from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import {
  getProducts,
} from "@/services/product.service";

import ProductCard from "./ProductCard";

import { Product } from "@/types/product";

export default function ProductList() {
  const [products, setProducts] =
    useState<Product[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          setLoading(true);
          const res =
            await getProducts();

          if (res.success) {
            setProducts(
              res.products
            );
          }
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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