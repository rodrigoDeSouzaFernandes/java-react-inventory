import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  TextField,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { productMaterialSchema } from "./schemas/productMaterialSchema";
import type {
  ProductMaterialFormData,
  ProductMaterialFormProps,
} from "../AddProductRawMaterialDialog/types";

const ProductMaterialForm = ({
  materials = [],
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
  isUpdate = false,
}: ProductMaterialFormProps) => {
  const form = useForm<ProductMaterialFormData>({
    defaultValues,
    resolver: zodResolver(productMaterialSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="rawMaterial"
          control={form.control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              disabled={isUpdate}
              options={materials}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              onChange={(_, value) => field.onChange(value)}
              value={field.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Raw Material"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message ||
                    "Select a material for the product"
                  }
                  fullWidth
                />
              )}
            />
          )}
        />

        <Controller
          name="requiredQuantity"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="number"
              label="Required Quantity"
              fullWidth
              inputProps={{ min: 1 }}
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message ||
                "Quantity needed per unit of product"
              }
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="flex-end"
        >
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={20} /> : "Save"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default ProductMaterialForm;
