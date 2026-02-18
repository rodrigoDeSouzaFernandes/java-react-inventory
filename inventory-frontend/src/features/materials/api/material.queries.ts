import api from "@/lib/client/axios";
import type { Material } from "../types";

export const getMaterials = async (): Promise<Material[]> => {
  const response = await api.get(`/raw-materials`);
  return response.data;
};

export const getMaterialById = async (id: number): Promise<Material> => {
  const response = await api.get(`/raw-materials/${id}`);
  return response.data;
};
