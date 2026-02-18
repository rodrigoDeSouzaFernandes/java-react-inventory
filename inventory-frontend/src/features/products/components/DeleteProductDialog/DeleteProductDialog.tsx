import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import type { ProductRow } from "../../types";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";

export interface DeleteProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductRow | null;
}

const DeleteProductDialog = ({
  open,
  onClose,
  product,
}: DeleteProductDialogProps) => {
  const { mutate: deleteProductById, isPending } = useDeleteProduct();

  const handleDelete = (id: number) => {
    deleteProductById(id, {
      onSuccess: onClose,
    });
  };

  if (!product) return;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      disableRestoreFocus
      aria-labelledby="delete-product-dialog-title"
      aria-describedby="delete-product-dialog-description"
    >
      <DialogTitle id="delete-product-dialog-title">Delete Product</DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>Warning</AlertTitle>
          This action is irreversible and will delete all data related to this
          product.
        </Alert>

        <Typography id="delete-product-dialog-description" sx={{ mb: 2 }}>
          Are you sure you want to delete the product "{product?.name}"?
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={[1, 2]}
          justifyContent="flex-end"
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            aria-label="Cancel deletion"
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            variant="contained"
            color="error"
            onClick={() => handleDelete(product?.id)}
            sx={{ width: { xs: "100%", sm: 120 } }}
            aria-label={`Delete product ${product?.name}`}
          >
            {isPending ? (
              <CircularProgress
                size={20}
                sx={{ color: "primary.contrastText" }}
                aria-busy="true"
              />
            ) : (
              "Delete"
            )}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;
