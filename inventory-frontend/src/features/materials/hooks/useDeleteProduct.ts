import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { deleteMaterial } from "../api/material.mutations";

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: deleteMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raw-materials"], exact: false });
      //TODO: show snackbar
    },
    onError: () => {
      //TODO: show snackbar
    },
  });
};
