import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMaterial } from "../api/material.mutations";
import type { AxiosError } from "axios";
import type { MaterialUpdateDTO } from "../types";

export const useUpdateMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, MaterialUpdateDTO>({
    mutationFn: updateMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["raw-materials"],
        exact: false,
      });
      //TODO: show snackbar
    },
    onError: () => {
      //TODO: show snackbar
    },
  });
};
