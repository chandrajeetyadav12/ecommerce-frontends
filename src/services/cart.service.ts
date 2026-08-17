import api from "@/lib/axios";

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (productId: string, quantity = 1) => {
  const response = await api.post("/cart/add", {
    productId,
    quantity,
  });
  return response.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await api.put("/cart/update", {
    productId,
    quantity,
  });
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};
