import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/product.queries";
import type { AxiosError } from "axios";
import type { Product } from "../types";

export const useProduct = (id: number) => {
  return useQuery<Product, AxiosError>({
    queryFn: () => getProductById(id),
    queryKey: ["products", id],
  });
};
