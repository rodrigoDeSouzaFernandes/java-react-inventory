import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/product.mutations";
import type { AxiosError } from "axios";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, ProductUpdateDTO>({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      //TODO: show snackbar
    },
    onError: () => {
      //TODO: show snackbar
    },
  });
};
