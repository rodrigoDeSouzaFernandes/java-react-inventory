import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product.queries";
import type { AxiosError } from "axios";

export const useProductsList = (productibleOnly: boolean) => {
  return useQuery<Product[], AxiosError>({
    queryFn: () => getProducts(productibleOnly),
    queryKey: ["products", productibleOnly],
  });
};
