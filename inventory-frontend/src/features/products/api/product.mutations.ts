import api from "@/lib/client/axios";

export const updateProduct = async (
  id: number,
  product: ProductUpdateDTO,
): Promise<void> => {
  await api.patch(`/products/${id}`, product);
};

export const createProduct = async (
  product: ProductCreateDTO,
): Promise<Product> => {
  const response = await api.post(`/products`, product);
  return response.data;
};
