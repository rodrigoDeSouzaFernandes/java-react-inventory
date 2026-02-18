export interface Product {
  id: number;
  name: string;
  value: number;
  productibleQuantity: number;
}

export interface ProductCreateDTO {
  name: string;
  value: number;
}

export type ProductUpdateDTO = Partial<ProductCreateDTO> & {
  id: number;
};

export type ProductRow = Omit<Product, "value"> & {
  value: string;
};

export interface ProductWithMaterials {
  id: number;
  name: string;
  value: number;
  producibleQuantity: number;
  materials: {
    id: number;
    name: string;
    stockQuantity: number;
    requiredQuantity: number;
  }[];
}

export interface ProductMaterial {
  productId: number;
  rawMaterialId: number;
  requiredQuantity: number;
}

export type ProductMaterialUpdateDTO = Pick<
  ProductMaterial,
  "requiredQuantity"
>;

export type ProductMaterialDeleteDTO =Omit<ProductMaterial, "requiredQuantity">