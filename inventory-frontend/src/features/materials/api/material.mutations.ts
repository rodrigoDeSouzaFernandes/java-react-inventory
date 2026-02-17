import api from "@/lib/client/axios";

export const updateMaterial = async (
  material: MaterialUpdateDTO,
): Promise<void> => {
  const { id, ...rest } = material;

  await api.patch(`/raw-materials/${id}`, rest);
};

export const createMaterial = async (
  material: MaterialCreateDTO,
): Promise<Material> => {
  const response = await api.post(`/raw-materials`, material);
  return response.data;
};

export const deleteMaterial = async (id: number): Promise<void> => {
  await api.delete(`/raw-materials/${id}`);
};
