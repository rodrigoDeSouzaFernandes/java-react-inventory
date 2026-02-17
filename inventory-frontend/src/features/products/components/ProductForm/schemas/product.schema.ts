import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),

  price: z.string().refine(
    (value) => {
      const numeric = Number(value.replace(/[^\d]/g, "")) / 100;
      return numeric > 0;
    },
    {
      message: "Price must be greater than zero",
    },
  ),
});
