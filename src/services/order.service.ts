import api from "@/lib/axios";


export const getMyOrders =
  async () => {
    const response =
      await api.get(
        "/orders/my-orders"
      );

    return response.data;
  };
  
export const placeOrder =
  async (data: {
    addressId: string;
    paymentMethod: string;
  }) => {
    const response =
      await api.post(
        "/orders/place",
        data
      );

    return response.data;
  };

  // Admin
export const getAllOrders = async () => {
  const response = await api.get("/orders/admin/all");

  return response.data;
};

// Admin
export const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  const response = await api.put(
    `/orders/admin/${orderId}`,
    {
      status,
    }
  );

  return response.data;
};