import type z from "zod";
import type { productSchema } from "./schemas/product.schema";

export type ProductFormData = z.infer<typeof productSchema>;

export interface ProductFormProps {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}
