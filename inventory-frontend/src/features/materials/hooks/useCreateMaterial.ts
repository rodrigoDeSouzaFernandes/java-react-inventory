import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMaterial } from "../api/material.mutations";
import type { AxiosError } from "axios";
import type { Material, MaterialCreateDTO } from "../types";
import { enqueueSnackbar } from "notistack";

export const useCreateMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation<Material, AxiosError, MaterialCreateDTO>({
    mutationFn: createMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["raw-materials"],
        exact: false,
      });
      enqueueSnackbar("Material created successfully!", { variant: "success" });
    },
    onError: (error) => {
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Failed to create material";
      enqueueSnackbar(message, { variant: "error" });
    },
  });
};
