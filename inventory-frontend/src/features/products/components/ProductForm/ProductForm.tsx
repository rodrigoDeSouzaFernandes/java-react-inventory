import { Controller } from "react-hook-form";
import {
  Stack,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { type ProductFormProps } from "./types";
import { useProductForm } from "./hooks/useProductsForm";
import { formatCurrencyFromInput } from "@/utils/currency";

const ProductForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel = "Salvar Produto",
}: ProductFormProps) => {
  const { form } = useProductForm({ defaultValues });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Nome"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              inputProps={{ maxLength: 15 }}
              label="Preço"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              value={field.value}
              onBeforeInput={(e) => {
                const char = e.data;
                const pattern = /[0-9]/;
                if (char && !pattern.test(char)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                field.onChange(formatCurrencyFromInput(e.target.value));
              }}
            />
          )}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={[1, 2]}
          justifyContent="flex-end"
        >
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{ width: { sm: 220 } }}
          >
            {isLoading ? (
              <CircularProgress
                size={20}
                sx={{ color: "primary.contrastText" }}
              />
            ) : (
              submitLabel
            )}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default ProductForm;
