"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { getProductById } from "@/services/product.service";
import { addToCart, getCart } from "@/services/cart.service";
import { Product } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { setCartCount } from "@/redux/slices/cartSlice";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const [productRes, cartRes] = await Promise.all([
          getProductById(id),
          getCart(),
        ]);

        if (productRes.success) {
          setProduct(productRes.product);
        }

        if (cartRes.success) {
          const existingItem = (cartRes.cart?.items || []).find(
            (item: any) =>
              item.productId?._id?.toString() === id.toString() ||
              item.productId?.toString() === id.toString()
          );

          setCartQuantity(existingItem?.quantity || 0);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5">Product not found</Typography>
      </Box>
    );
  }

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name || "Uncategorized";

  const availableStock = Math.max(product.stock - cartQuantity, 0);
  const canAddToCart = product.stock > 0 && cartQuantity < product.stock;

  const handleAddToCart = async () => {
    if (!product?._id) return;

    if (product.stock <= 0) {
      window.alert("This product is out of stock");
      return;
    }

    if (cartQuantity >= product.stock) {
      window.alert(`Only ${availableStock} item(s) left in stock for this product`);
      return;
    }

    try {
      const res = await addToCart(product._id, 1);

      if (res.success) {
        setCartQuantity((prev) => Math.min(prev + 1, product.stock));
        dispatch(setCartCount(res.cartCount || 0));
        window.alert("Product added to cart");
      } else {
        window.alert(res.message || "Unable to add to cart");
      }
    } catch (error) {
      console.log(error);
      window.alert("Unable to add to cart");
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 5 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
          gap: 4,
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid #e0e0e0",
            bgcolor: "#fff",
          }}
        >
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={900}
              height={700}
              unoptimized
              style={{
                width: "100%",
                height: "100%",
                maxHeight: 600,
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <Box
              sx={{
                height: 420,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
              }}
            >
              <Typography variant="h6">No image available</Typography>
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {product.name}
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, color: "primary.main" }}>
            ₹ {product.price}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 700, display: "inline" }}>
              Category:{" "}
            </Typography>
            <Typography sx={{ display: "inline", fontWeight: 400 }}>
              {categoryName}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 700, display: "inline" }}>
              Stock:{" "}
            </Typography>
            <Typography sx={{ display: "inline", fontWeight: 400 }}>
              {product.stock} units
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 700, display: "inline" }}>
              Seller:{" "}
            </Typography>
            <Typography sx={{ display: "inline", fontWeight: 400 }}>
              {typeof product.sellerId === "object" && product.sellerId?.name
                ? product.sellerId.name
                : "Seller"}
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            onClick={handleAddToCart}
            disabled={!canAddToCart}
          >
            {product.stock <= 0
              ? "Out of Stock"
              : cartQuantity >= product.stock
                ? "Max Reached"
                : "Add to Cart"}
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Description
        </Typography>
        <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
          {product.description}
        </Typography>
      </Box>
    </Box>
  );
}
