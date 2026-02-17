import api from "@/lib/client/axios";

export const updateProduct = async (
  product: ProductUpdateDTO,
): Promise<void> => {
  const { id, ...rest } = product;

  await api.patch(`/products/${id}`, rest);
};

export const createProduct = async (
  product: ProductCreateDTO,
): Promise<Product> => {
  const response = await api.post(`/products`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
