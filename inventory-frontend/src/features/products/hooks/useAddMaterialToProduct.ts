import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductMaterial } from "../types";
import type { AxiosError } from "axios";
import { addMaterialToProduct } from "../api/product-material.mutations";
import { enqueueSnackbar } from "notistack";

export const useAddMaterialToProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<ProductMaterial, AxiosError, ProductMaterial>({
    mutationFn: addMaterialToProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["products", data.productId],
        exact: false,
      });
      enqueueSnackbar("Material added to product successfully.", {
        variant: "success",
      });
    },
    onError: (error) => {
      let message =
        (error.response?.data as { message?: string })?.message ||
        "Failed to add material to the product. Please try again.";

      if (error.status === 409) {
        message = "This material has already been added to the product.";
      }

      enqueueSnackbar(message, { variant: "error" });
    },
  });
};
