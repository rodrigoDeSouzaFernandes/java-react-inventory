import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/product.mutations";
import type { AxiosError } from "axios";
import type { Product, ProductCreateDTO } from "../types";
import { enqueueSnackbar } from "notistack";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, AxiosError, ProductCreateDTO>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      enqueueSnackbar("Product created successfully!", { variant: "success" });
    },
    onError: (error) => {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Failed to create product";

      enqueueSnackbar(message, { variant: "error" });
    },
  });
};
