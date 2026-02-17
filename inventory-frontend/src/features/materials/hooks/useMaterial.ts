import { useQuery } from "@tanstack/react-query";
import { getMaterialById } from "../api/material.queries";
import type { AxiosError } from "axios";

export const useMaterial = (id: number) => {
  return useQuery<Material, AxiosError>({
    queryFn: () => getMaterialById(id),
    queryKey: ["raw-materials", id],
  });
};
