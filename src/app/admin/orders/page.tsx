"use client";

import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "@/services/order.service";

interface Order {
  _id: string;
  totalAmount: number;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getAllOrders();

      if (res.success) {
        setOrders(res.orders);
      }
    } catch (error) {
      console.error(
        "Failed to fetch orders:",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
      const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getAllOrders();

      if (res.success) {
        setOrders(res.orders);
      }
    } catch (error) {
      console.error(
        "Failed to fetch orders:",
        error
      );
    } finally {
      setLoading(false);
    }
  };
    fetchOrders();
  }, []);

  const handleStatusChange = async (
    orderId: string,
    status: string
  ) => {
    try {
      const res = await updateOrderStatus(
        orderId,
        status
      );

      if (res.success) {
        // Refresh orders after update
        fetchOrders();
      }
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div>
      <h1>All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>
              Order #{order._id}
            </h3>

            <p>
              Amount: ₹{order.totalAmount}
            </p>

            <p>
              Payment: {order.paymentMethod}
            </p>

            <p>
              Payment Status:{" "}
              {order.paymentStatus}
            </p>

            <p>
              Order Status:{" "}
              {order.orderStatus}
            </p>

            <select
              value={order.orderStatus}
              onChange={(e) =>
                handleStatusChange(
                  order._id,
                  e.target.value
                )
              }
            >
              <option value="pending">
                Pending
              </option>

              <option value="confirmed">
                Confirmed
              </option>

              <option value="processing">
                Processing
              </option>

              <option value="shipped">
                Shipped
              </option>

              <option value="delivered">
                Delivered
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}