import type z from "zod";
import type { materialSchema } from "./schemas/material.schema";

export type MaterialFormData = z.infer<typeof materialSchema>;

export interface MaterialFormProps {
  defaultValues?: Partial<MaterialFormData>;
  onSubmit: (data: MaterialFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}