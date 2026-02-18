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
import { useRemoveMaterialFromProduct } from "../../hooks/useRemoveMaterialFromProduct";
import type { MaterialRow, ProductDetails } from "../ProductDetails/types";

export interface RemoveMaterialFromProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductDetails | null;
  material: MaterialRow | null;
}

const RemoveMaterialFromProductDialog = ({
  open,
  onClose,
  product,
  material,
}: RemoveMaterialFromProductDialogProps) => {
  const { mutate: removeMaterial, isPending } = useRemoveMaterialFromProduct();

  const handleDelete = () => {
    if (!product?.id || !material?.id) return;

    removeMaterial(
      { productId: product?.id, rawMaterialId: material?.id },
      {
        onSuccess: onClose,
      },
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      disableRestoreFocus
      aria-labelledby="delete-product-dialog-title"
      aria-describedby="delete-product-dialog-description"
    >
      <DialogTitle id="delete-product-dialog-title">
        Remove Material From Product
      </DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>Warning</AlertTitle>
          This action will remove the material from the product. You can add it
          again later if needed.
        </Alert>

        <Typography id="delete-product-dialog-description" sx={{ mb: 2 }}>
          Are you sure you want to remove the material{" "}
          <strong>"{material?.name}"</strong> from the product{" "}
          <strong>"{product?.name}"</strong>?
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
            onClick={() => handleDelete()}
            sx={{ width: { xs: "100%", sm: 120 } }}
            aria-label={`Remove material: ${material?.name}, from product: ${product?.name}`}
          >
            {isPending ? (
              <CircularProgress
                size={20}
                sx={{ color: "primary.contrastText" }}
                aria-busy="true"
              />
            ) : (
              "Remove"
            )}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveMaterialFromProductDialog;
