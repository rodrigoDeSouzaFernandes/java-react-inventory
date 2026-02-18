import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "../ProductForm";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { parseCurrencyToNumber } from "@/utils/currency";
import type { ProductFormData } from "../ProductForm/types";

interface CreateProductDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateProductDialog = ({ open, onClose }: CreateProductDialogProps) => {
  const { mutate: createProduct, isPending } = useCreateProduct();

  const create = (formData: ProductFormData) => {
    createProduct(
      {
        name: formData.name,
        value: parseCurrencyToNumber(formData.price),
      },
      {
        onSuccess: onClose,
      },
    );
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="create-product-dialog-title"
      disableRestoreFocus
    >
      <DialogTitle
        id="create-product-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Create Product
        <IconButton onClick={onClose} aria-label="Close dialog" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <ProductForm
          onSubmit={create}
          onCancel={onClose}
          isLoading={isPending}
          submitLabel="Create Product"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
