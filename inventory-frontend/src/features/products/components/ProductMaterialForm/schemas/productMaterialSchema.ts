import z from "zod";

export const productMaterialSchema = z.object({
  rawMaterial: z
    .object({
      id: z.number(),
      name: z.string(),
      stockQuantity: z.number(),
    })
    .nullable()
    .refine((val) => val !== null, "Please select a material"),
  requiredQuantity: z
    .number()
    .min(1, "Required quantity must be at least 1")
    .int("Required quantity must be an integer"),
});