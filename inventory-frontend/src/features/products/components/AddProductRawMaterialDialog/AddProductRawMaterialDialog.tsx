import {
  Alert,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import type { ProductWithMaterials } from "../../types";
import ProductMaterialForm from "./ProductMaterialForm";
import { useMaterialsList } from "@/features/materials/hooks/useMaterialsList";
import { useMemo } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

interface AddProductRawMaterialDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductWithMaterials | null;
}

const AddProductRawMaterialDialog = ({
  open,
  onClose,
  product,
}: AddProductRawMaterialDialogProps) => {
  const {
    data: rawMaterials,
    isLoading: isMaterialsListLoading,
    isError,
  } = useMaterialsList();

  const materialsList = useMemo(
    () =>
      rawMaterials
        ? rawMaterials?.filter((newMaterial) =>
            product?.materials.every(
              (currentMaterial) => currentMaterial.id !== newMaterial.id,
            ),
          )
        : [],
    [rawMaterials],
  );

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
        {isError ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <Typography>
              Something went wrong while loading the materials. Please try
              again.
            </Typography>
          </Alert>
        ) : materialsList.length === 0 ? (
          <Alert severity="warning">
            <AlertTitle>Error</AlertTitle>
            <Typography>There are no remaining materials to add.</Typography>
          </Alert>
        ) : isMaterialsListLoading ? (
          <LoadingSkeleton />
        ) : (
          <ProductMaterialForm
            onSubmit={(formData) => console.log(formData)}
            materials={materialsList}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddProductRawMaterialDialog;
