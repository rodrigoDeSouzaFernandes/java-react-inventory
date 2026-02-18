import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { deleteProduct } from "../api/product.mutations";
import { enqueueSnackbar } from "notistack";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      enqueueSnackbar("Product deleted successfully!", { variant: "success" });
    },
    onError: (error) => {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Failed to delete product";

      enqueueSnackbar(message, { variant: "error" });
    },
  });
};
