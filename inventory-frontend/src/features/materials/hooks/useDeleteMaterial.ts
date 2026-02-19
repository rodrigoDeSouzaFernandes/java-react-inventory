import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { deleteMaterial } from "../api/material.mutations";
import { enqueueSnackbar } from "notistack";

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: deleteMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["raw-materials"],
        exact: false,
      });
      enqueueSnackbar("Material deleted successfully!", { variant: "success" });
    },
    onError: (error) => {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Failed to delete material";
      enqueueSnackbar(message, { variant: "error" });
    },
  });
};
