export interface RawMaterialOption {
  id: number;
  name: string;
  stockQuantity: number;
}

export interface ProductMaterialFormData {
  rawMaterial: RawMaterialOption | null;
  requiredQuantity: number;
}

export interface ProductMaterialFormProps {
  materials: RawMaterialOption[];
  defaultValues?: Partial<ProductMaterialFormData>;
  onSubmit: (data: ProductMaterialFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isUpdate?: boolean;
}
