import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ProductMaterialDeleteDTO } from "../types";
import { removeMaterialFromProduct } from "../api/product-material.mutations";
import { enqueueSnackbar } from "notistack";

export const useRemoveMaterialFromProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, ProductMaterialDeleteDTO>({
    mutationFn: removeMaterialFromProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      enqueueSnackbar("Material removed from product successfully.", { variant: "success" });
    },
    onError: (error) => {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Failed to remove material from product. Please try again.";

      enqueueSnackbar(message, { variant: "error" });
    },
  });
};
