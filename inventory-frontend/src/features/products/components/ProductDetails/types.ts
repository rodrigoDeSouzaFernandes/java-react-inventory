export interface MaterialRow {
  id: number;
  name: string;
  stockQuantity: number;
  requiredQuantity: number;
}

export interface ProductDetails {
  id: number;
  name: string;
  value: number;
  producibleQuantity: number;
  materials: MaterialRow[];
}
