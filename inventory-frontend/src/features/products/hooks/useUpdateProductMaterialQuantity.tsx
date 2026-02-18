import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductMaterial } from "../types";
import type { AxiosError } from "axios";
import { updateProductMaterialQuantity } from "../api/product-material.mutations";
import { enqueueSnackbar } from "notistack";

export const useUpdateProductMaterialQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, ProductMaterial>({
    mutationFn: updateProductMaterialQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false,
      });
      enqueueSnackbar("Material added to product successfully.", {
        variant: "success",
      });
    },
    onError: (error) => {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Failed to update required quantity. Please try again.";

      enqueueSnackbar(message, { variant: "error" });
    },
  });
};
