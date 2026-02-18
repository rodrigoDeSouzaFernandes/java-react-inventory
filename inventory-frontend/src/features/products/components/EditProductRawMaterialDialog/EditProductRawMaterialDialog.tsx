import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import type { ProductWithMaterials } from "../../types";
import ProductMaterialForm from "../ProductMaterialForm";
import type { ProductMaterialFormData } from "./types";
import { useUpdateProductMaterialQuantity } from "../../hooks/useUpdateProductMaterialQuantity";
import type { MaterialRow } from "../ProductDetails/types";

interface EditProductRawMaterialDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductWithMaterials | null;
  material: MaterialRow | null;
}

const EditProductRawMaterialDialog = ({
  open,
  onClose,
  product,
  material,
}: EditProductRawMaterialDialogProps) => {
  const { mutate: updateQuantity, isPending } =
    useUpdateProductMaterialQuantity();

  const handleAddMaterial = (formData: ProductMaterialFormData) => {
    if (
      !product?.id ||
      !formData?.rawMaterial?.id ||
      !formData?.requiredQuantity
    ) {
      return;
    }

    updateQuantity(
      {
        productId: product?.id,
        rawMaterialId: formData.rawMaterial?.id,
        requiredQuantity: formData.requiredQuantity,
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
        Add Raw Material
        <IconButton onClick={onClose} aria-label="Close dialog" size="small">
          <GridCloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <ProductMaterialForm
          isUpdate
          onSubmit={handleAddMaterial}
          onCancel={onClose}
          isLoading={isPending}
          defaultValues={{
            rawMaterial: material,
            requiredQuantity: material?.requiredQuantity,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductRawMaterialDialog;
