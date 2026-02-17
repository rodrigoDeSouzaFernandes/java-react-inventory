import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getMaterials } from "../api/material.queries";

export const useMaterialsList = () => {
  return useQuery<Material[], AxiosError>({
    queryFn: getMaterials,
    queryKey: ["raw-materials"],
  });
};
