import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMaterial } from "../api/material.mutations";
import type { AxiosError } from "axios";
import type { MaterialUpdateDTO } from "../types";
import { enqueueSnackbar } from "notistack";

export const useUpdateMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, MaterialUpdateDTO>({
    mutationFn: updateMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["raw-materials"],
        exact: false,
      });
      enqueueSnackbar("Material updated successfully!", { variant: "success" });
    },
    onError: (error) => {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Failed to update material";
      enqueueSnackbar(message, { variant: "error" });
    },
  });
};
