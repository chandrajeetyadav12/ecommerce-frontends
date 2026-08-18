"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getCart, removeFromCart, updateCartItem } from "@/services/cart.service";
import { useAppDispatch } from "@/redux/hooks";
import { setCartItems } from "@/redux/slices/cartSlice";
import CustomInput from "@/components/common/CustomInput";
import { useRouter } from "next/navigation";
interface CartProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  category?: {
    _id: string;
    name: string;
  };
}

interface CartItem {
  _id: string;
  productId: CartProduct;
  quantity: number;
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();

      if (res.success) {
        const cartItems = res.cart?.items || [];
        setItems(cartItems);
        dispatch(
          setCartItems(
            cartItems.map((item: CartItem) => ({
              productId: item.productId?._id || item.productId,
              quantity: item.quantity,
            }))
          )
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [dispatch]);

  const handleQtyChange = async (productId: string, quantity: number) => {
    if (!productId) return;

    const currentItem = items.find((item) => item.productId?._id === productId);
    const maxQty = currentItem?.productId?.stock ?? quantity;

    if (quantity < 1) return;
    if (quantity > maxQty) return;

    const res = await updateCartItem(productId, quantity);

    if (!res.success) {
      window.alert(res.message || "Unable to update quantity");
      return;
    }

    fetchCart();
  };

  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
    fetchCart();
  };

  const subtotal = items.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  if (loading) {
    return (
      <Box sx={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!items.length) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, py: 6, textAlign: "center" }}>
        <Typography variant="h4">Your cart is empty</Typography>
        <Button href="/products" sx={{ mt: 3 }} variant="contained">
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Shopping Cart
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 4,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {items.map((item) => (
            <Box
              key={item.productId?._id}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
                gap: 2,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "#fff",
              }}
            >
              <Box sx={{ width: "100%", height: 140, borderRadius: 2, overflow: "hidden" }}>
                {item.productId?.images?.[0] ? (
                  <Image
                    src={item.productId.images[0]}
                    alt={item.productId.name}
                    width={200}
                    height={140}
                    unoptimized
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box sx={{ width: "100%", height: "100%", bgcolor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="caption">No image</Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.productId?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.productId?.category?.name || "Uncategorized"}
                    </Typography>
                  </Box>

                  <IconButton color="error" onClick={() => handleRemove(item.productId?._id)}>
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Box>

                <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700 }}>
                  ₹ {item.productId?.price}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleQtyChange(item.productId?._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>

                  <CustomInput
                    label=""
                    type="number"
                    size="small"
                    value={item.quantity}
                    inputProps={{ min: 1, max: item.productId?.stock || 1, style: { textAlign: "center" } }}
                    sx={{ width: 90, margin: 0 }}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      if (!Number.isNaN(value)) {
                        handleQtyChange(item.productId?._id, Math.min(value, item.productId?.stock || value));
                      }
                    }}
                  />

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleQtyChange(item.productId?._id, item.quantity + 1)}
                    disabled={item.quantity >= (item.productId?.stock || 1)}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2, bgcolor: "#fff", height: "fit-content" }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Summary
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Subtotal</Typography>
            <Typography>₹ {subtotal}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Shipping</Typography>
            <Typography>Free</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography sx={{ fontWeight: 700 }}>Total</Typography>
            <Typography sx={{ fontWeight: 700 }}>₹ {subtotal}</Typography>
          </Box>

          <Button variant="contained" fullWidth size="large"
            onClick={() =>
              router.push("/checkout")
            }
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
