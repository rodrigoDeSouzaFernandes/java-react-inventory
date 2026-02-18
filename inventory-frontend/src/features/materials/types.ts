export interface Material {
  id: number;
  name: string;
  stockQuantity: number;
}

export interface MaterialCreateDTO {
  name: string;
  stockQuantity: number;
}

export type MaterialUpdateDTO = Partial<MaterialCreateDTO> & {
  id: number;
};
