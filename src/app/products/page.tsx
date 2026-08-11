"use client";
import Box from "@mui/material/Box";
import ProductList from "@/components/product/ProductList";

export default function ProductsPage() {

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        px: 2,
      }}
    >
      <h1>
        Products
      </h1>
      <ProductList />

    </Box>
  );
}