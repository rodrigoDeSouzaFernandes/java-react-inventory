import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/product.queries";
import type { AxiosError } from "axios";

export const useProduct = (id: number) => {
  return useQuery<Product, AxiosError>({
    queryFn: () => getProductById(id),
    queryKey: ["products", id],
  });
};
