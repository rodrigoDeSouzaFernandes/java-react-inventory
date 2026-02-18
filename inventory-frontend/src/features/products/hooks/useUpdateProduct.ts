import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/product.mutations";
import type { AxiosError } from "axios";
import type { ProductUpdateDTO } from "../types";
import { enqueueSnackbar } from "notistack";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, ProductUpdateDTO>({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      enqueueSnackbar("Product updated successfully!", { variant: "success" });
    },
    onError: (error) => {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Failed to save changes";

      enqueueSnackbar(message, { variant: "error" });
    },
  });
};
