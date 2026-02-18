export interface ProductDetails {
  id: number;
  name: string;
  value: number;
  producibleQuantity: number;
  materials: [
    {
      id: number;
      name: string;
      stockQuantity: number;
      requiredQuantity: number;
    },
  ];
}
