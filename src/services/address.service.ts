// src/services/address.service.ts

import api from "@/lib/axios";

export const createAddress = async (
  data: any
) => {
  const response =
    await api.post(
      "/addresses",
      data
    );

  return response.data;
};

export const getAddresses =
  async () => {
    const response =
      await api.get(
        "/addresses"
      );

    return response.data;
};

export const deleteAddress =
  async (id: string) => {
    const response =
      await api.delete(
        `/addresses/${id}`
      );

    return response.data;
};