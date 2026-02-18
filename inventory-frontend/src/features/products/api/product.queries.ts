import api from "@/lib/client/axios";
import type { Product, ProductWithMaterials } from "../types";

export const getProducts = async (
  productibleOnly: boolean = false,
): Promise<Product[]> => {
  const response = await api.get(
    `/products/?productibleOnly=${productibleOnly}`,
  );
  return response.data;
};

export const getProductById = async (
  id: number,
): Promise<ProductWithMaterials> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
