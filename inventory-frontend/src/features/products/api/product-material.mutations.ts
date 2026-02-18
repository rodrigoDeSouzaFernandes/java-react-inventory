import api from "@/lib/client/axios";
import type { ProductMaterial } from "../types";

export const addMaterialToProduct = async (
  dto: ProductMaterial,
): Promise<ProductMaterial> => {
  const response = await api.post("/product-raw-materials", dto);
  return response.data;
};
