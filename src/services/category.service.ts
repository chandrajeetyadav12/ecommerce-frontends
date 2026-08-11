import api from "@/lib/axios";

export const createCategory = async (
  data: {
    name: string;
  }
) => {
  const response =
    await api.post(
      "/categories",
      data
    );

  return response.data;
};

export const getCategories =
  async () => {
    const response =
      await api.get(
        "/categories"
      );

    return response.data;
  };