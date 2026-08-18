"use client";

import { getMyOrders } from "@/services/order.service";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  totalAmount: number;
  orderStatus: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();

        if (res.success) {
          setOrders(res.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order #{order._id}</h3>

            <p>₹{order.totalAmount}</p>

            <p>{order.orderStatus}</p>
          </div>
        ))
      )}
    </div>
  );
}