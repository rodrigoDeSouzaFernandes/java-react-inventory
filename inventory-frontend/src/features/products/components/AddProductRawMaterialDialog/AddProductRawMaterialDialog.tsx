import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import type { ProductWithMaterials } from "../../types";

type AddProductRawMaterialDialogProps = {
  open: boolean;
  onClose: () => void;
  product: ProductWithMaterials;
};

const AddProductRawMaterialDialog = ({
  open,
  onClose,
}: AddProductRawMaterialDialogProps) => {
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

      <DialogContent dividers>content</DialogContent>
    </Dialog>
  );
};

export default AddProductRawMaterialDialog;
