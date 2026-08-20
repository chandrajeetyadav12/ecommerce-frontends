"use client";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { Order } from "@/types/order";

interface OrderCardProps {
  order: Order;
}

const statusColors = {
  pending: "warning",
  confirmed: "info",
  shipped: "primary",
  delivered: "success",
  cancelled: "error",
} as const;

export default function OrderCard({ order }: OrderCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(order.createdAt));

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1.5,
          }}
        >
          <Box>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
              Order #{order._id.slice(-8).toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Placed on {formattedDate}
            </Typography>
          </Box>

          <Chip
            label={order.orderStatus}
            color={statusColors[order.orderStatus]}
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          {order.items.map((item, index) => (
            <Stack
              key={`${order._id}-${item.productName}-${index}`}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              {item.image ? (
                <Box
                  component="img"
                  src={item.image}
                  alt={item.productName}
                  sx={{
                    width: 72,
                    height: 72,
                    objectFit: "cover",
                    borderRadius: 1,
                    bgcolor: "grey.100",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 1,
                    bgcolor: "grey.100",
                    flexShrink: 0,
                  }}
                />
              )}

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography sx={{ fontWeight: 600, wordBreak: "break-word" }}>
                  {item.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity} {item.quantity === 1 ? "item" : "items"} x ₹
                  {item.price.toLocaleString("en-IN")}
                </Typography>
              </Box>

              <Typography sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Delivery to
            </Typography>
            <Typography variant="body2">
              {order.address.fullName}, {order.address.addressLine1}, {order.address.city},{" "}
              {order.address.state} - {order.address.pincode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.paymentMethod} · Payment {order.paymentStatus}
            </Typography>
          </Box>

          <Box sx={{ minWidth: { sm: 220 }, textAlign: { xs: "left", sm: "right" } }}>
            <Stack spacing={0.5}>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Items total
                </Typography>
                <Typography variant="body2">
                  ₹{order.subtotal.toLocaleString("en-IN")}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Shipping
                </Typography>
                <Typography variant="body2">
                  {order.shippingCharge === 0
                    ? "Free"
                    : `₹${order.shippingCharge.toLocaleString("en-IN")}`}
                </Typography>
              </Box>
              <Divider sx={{ my: 0.5 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
                <Typography sx={{ fontWeight: 700 }}>Total charge</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}