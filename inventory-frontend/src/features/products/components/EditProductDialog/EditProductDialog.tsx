import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "../ProductForm";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { parseCurrencyToNumber } from "@/utils/currency";
import type { ProductFormData } from "../ProductForm/types";
import type { ProductRow } from "../../types";

export interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductRow | null;
}

const EditProductDialog = ({
  open,
  onClose,
  product,
}: EditProductDialogProps) => {
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const handleUpdate = (formData: ProductFormData) => {
    if (!product) return;

    updateProduct(
      {
        id: product.id,
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
      aria-labelledby="edit-product-dialog-title"
      disableRestoreFocus
    >
      <DialogTitle
        id="edit-product-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Edit Product
        <IconButton onClick={onClose} aria-label="Close dialog" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <ProductForm
          defaultValues={{
            name: product?.name || "",
            price: product?.value || "",
          }}
          onSubmit={handleUpdate}
          onCancel={onClose}
          isLoading={isPending}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
