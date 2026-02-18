import { useForm } from "react-hook-form";
import { type MaterialFormData } from "../types";
import { materialSchema } from "../schemas/material.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface UseMaterialFormProps {
  defaultValues?: Partial<MaterialFormData>;
}

export const useMaterialForm = ({ defaultValues }: UseMaterialFormProps) => {
  const form = useForm<MaterialFormData>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      stockQuantity: defaultValues?.stockQuantity ?? 0,
    },
  });

  return { form };
};