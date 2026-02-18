import api from "@/lib/client/axios";
import type {
  ProductMaterial,
  ProductMaterialDeleteDTO,
  ProductMaterialUpdateDTO,
} from "../types";

export const addMaterialToProduct = async (
  dto: ProductMaterial,
): Promise<ProductMaterial> => {
  const response = await api.post("/product-raw-materials", dto);
  return response.data;
};

export const updateProductMaterialQuantity = async (
  dto: ProductMaterial,
): Promise<void> => {
  const body: ProductMaterialUpdateDTO = {
    requiredQuantity: dto.requiredQuantity,
  };

  await api.put(
    `product-raw-materials/${dto.productId}/${dto.rawMaterialId}`,
    body,
  );
};

export const removeMaterialFromProduct = async (
  dto: ProductMaterialDeleteDTO,
): Promise<void> => {
  await api.delete(
    `product-raw-materials/${dto.productId}/${dto.rawMaterialId}`,
  );
};
