import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMaterial } from "../api/material.mutations";
import type { AxiosError } from "axios";

export const useCreateMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation<Material, AxiosError, MaterialCreateDTO>({
    mutationFn: createMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raw-materials"], exact: false });
      //TODO: show snackbar
    },
    onError: () => {
      //TODO: show snackbar
    },
  });
};
