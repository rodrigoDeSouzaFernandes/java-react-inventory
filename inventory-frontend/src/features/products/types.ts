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
