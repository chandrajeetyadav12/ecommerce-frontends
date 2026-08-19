"use client";

import { useEffect, useState } from "react";

import { Alert, Box, Container, Stack, Typography } from "@mui/material";

import OrderCard from "@/components/order/OrderCard";
import PageLoader from "@/components/common/PageLoader";
import { getMyOrders } from "@/services/order.service";
import type { Order } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getMyOrders();

        if (res.success) {
          setOrders(res.orders ?? []);
        } else {
          setError(res.message ?? "Unable to load your orders.");
        }
      } catch {
        setError("Unable to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 1, sm: 3 } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
        My Orders
      </Typography>

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert severity="info">You have not placed any orders yet.</Alert>
      ) : (
        <Box>
          <Stack spacing={2}>
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </Stack>
        </Box>
      )}
    </Container>
  );
}