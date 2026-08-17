"use client";

import {
  useEffect,
  useState,
} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  getCategories,
} from "@/services/category.service";
import {
  getProducts,
} from "@/services/product.service";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] =
    useState<Product[]>([]);
  const [categories, setCategories] =
    useState<Category[]>([]);
  const [loading, setLoading] =
    useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();

      if (res.success) {
        setCategories(res.categories);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await getProducts({
          category:
            selectedCategory === "all"
              ? undefined
              : selectedCategory,
          search: search.trim(),
        });

        if (res.success) {
          setProducts(res.products);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, search]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        gap: 3,
        mt: 3,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            md: 260,
          },
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          bgcolor: "#fff",
          height: "fit-content",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2 }}
        >
          Categories
        </Typography>

        <Button
          fullWidth
          variant={
            selectedCategory === "all"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            setSelectedCategory("all")
          }
          sx={{
            mb: 1,
            justifyContent: "flex-start",
          }}
        >
          All Products
        </Button>

        {categories.map((category) => (
          <Button
            key={category._id}
            fullWidth
            variant={
              selectedCategory === category._id
                ? "contained"
                : "outlined"
            }
            onClick={() =>
              setSelectedCategory(category._id)
            }
            sx={{
              mb: 1,
              justifyContent: "flex-start",
            }}
          >
            {category.name}
          </Button>
        ))}
      </Box>

      <Box sx={{ flex: 1 }}>
        <TextField
          fullWidth
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search products..."
          sx={{ mb: 3 }}
        />

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mt: 2 }}
          >
            No products found
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}