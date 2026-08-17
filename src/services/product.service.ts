import api from "@/lib/axios";

export const createProduct = async (
  data: FormData
) => {
  const response = await api.post(
    "/products/create",
    data
  );

  return response.data;
};

export const getProducts = async (
  params?: {
    category?: string;
    search?: string;
  }
) => {
  const query = new URLSearchParams();

  if (params?.category) {
    query.append("category", params.category);
  }

  if (params?.search) {
    query.append("search", params.search);
  }

  const queryString = query.toString();
  const response = await api.get(
    `/products${queryString ? `?${queryString}` : ""}`
  );

  return response.data;
};

//admin getting pending products
export const getPendingProducts =
  async () => {
    const response =
      await api.get(
        "/products/pending"
      );

    return response.data;
  };


  export const approveProduct =
  async (id: string) => {
    const response =
      await api.put(
        `/products/approve/${id}`
      );

    return response.data;
  };

export const rejectProduct =
  async (id: string) => {
    const response =
      await api.put(
        `/products/reject/${id}`
      );

    return response.data;
  };
export const getMyProducts =
  async () => {
    const response =
      await api.get(
        "/products/my-products"
      );

    return response.data;
  };

export const getProductById =
  async (id: string) => {
    const response =
      await api.get(
        `/products/${id}`
      );

    return response.data;
  };

export const updateProduct =
  async (
    id: string,
    data: FormData
  ) => {
    const response =
      await api.put(
        `/products/${id}`,
        data
      );

    return response.data;
  };

export const deleteProduct =
  async (id: string) => {
    const response =
      await api.delete(
        `/products/${id}`
      );

    return response.data;
  };
