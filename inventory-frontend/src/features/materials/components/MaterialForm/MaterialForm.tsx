import { Controller } from "react-hook-form";
import { Stack, TextField, Button, CircularProgress } from "@mui/material";
import { type MaterialFormProps } from "./types";
import { useMaterialForm } from "./hooks/useMaterialForm";

const MaterialForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel = "Save",
}: MaterialFormProps) => {
  const { form } = useMaterialForm({ defaultValues });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="stockQuantity"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="number"
              label="Stock Quantity"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={[1, 2]}
          justifyContent="flex-end"
        >
          <Button variant="outlined" onClick={onCancel}>
            Cancel
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

export default MaterialForm;
