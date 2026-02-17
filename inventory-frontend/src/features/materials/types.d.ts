interface Material {
  id: number;
  name: string;
  stockQuantity: number;
}

interface MaterialCreateDTO {
  name: string;
  stockQuantity: number;
}

type MaterialUpdateDTO = Partial<MaterialCreateDTO> & {
  id: number;
};
