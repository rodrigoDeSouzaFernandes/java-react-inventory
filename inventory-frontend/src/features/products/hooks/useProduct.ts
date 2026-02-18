import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/product.queries";
import type { AxiosError } from "axios";
import type { ProductWithMaterials } from "../types";

export const useProduct = (id: number) => {
  return useQuery<ProductWithMaterials, AxiosError>({
    queryFn: () => getProductById(id),
    queryKey: ["products", id],
  });
};
