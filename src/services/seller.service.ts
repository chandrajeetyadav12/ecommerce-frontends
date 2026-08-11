import api from "@/lib/axios";

export const createSellerProfile =
  async (formData: FormData) => {
    const response =
      await api.post(
        "/seller/register",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const getMySellerProfile =
  () => {
    return api.get(
      "/seller/profile"
    );
    
  };

export const getPendingSellers =
  () => {
    return api.get(
      "/seller/pending"
    );
  };

export const approveSeller = (
  sellerId:string
) => {
  return api.put(
    `/seller/approve/${sellerId}`
  );
};

export const rejectSeller = (
  sellerId:string,
  reason:string
) => {
  return api.put(
    `/seller/reject/${sellerId}`,
    { reason }
  );
};