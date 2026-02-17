import { useForm } from "react-hook-form";
import { type ProductFormData } from "../types";
import { productSchema } from "../schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface UseProductFormProps {
  defaultValues?: Partial<ProductFormData>;
}

export const useProductForm = ({ defaultValues }: UseProductFormProps) => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      price: defaultValues?.price ?? "R$ 0,00",
    },
  });

  return { form };
};
