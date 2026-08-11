"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getPendingProducts,
  approveProduct,
  rejectProduct,
} from "@/services/product.service";
import { Product } from "@/types/product";
import Box from "@mui/material/Box";
import ProductCard from "@/components/product/ProductCard";

export default function PendingProducts() {
  const [products, setProducts] = useState<Product[]>([])


  const fetchProducts =
    async () => {
      try {
        const res =
          await getPendingProducts();
        console.log(res.products)

        if (res.success) {
          setProducts(
            res.products
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          const res =
            await getPendingProducts();

          if (res.success) {
            setProducts(
              res.products
            );
          }
        } catch (error) {
          console.log(error);
        }
      };
    fetchProducts();
  }, []);

  const handleApprove =
    async (id: string) => {
      await approveProduct(id);

      fetchProducts();
    };

  const handleReject =
    async (id: string) => {
      await rejectProduct(id);

      fetchProducts();
    };

  return (
    <div>
      <h1>
        Pending Products
      </h1>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 3,
        }}
      >
        {products.map(
          (product) => (
            <ProductCard
              key={product._id}
              product={product}
              onApprove={
                handleApprove
              }
              onReject={
                handleReject
              }
            />
          )
        )}
      </Box>
    </div>
  );
}