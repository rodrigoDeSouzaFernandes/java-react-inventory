import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MaterialForm from "../MaterialForm";
import { useUpdateMaterial } from "../../hooks/useUpdateMaterial";
import type { MaterialFormData } from "../MaterialForm/types";
import type { Material } from "../../types";

export interface EditMaterialDialogProps {
  open: boolean;
  onClose: () => void;
  material: Material | null;
}

const EditMaterialDialog = ({
  open,
  onClose,
  material,
}: EditMaterialDialogProps) => {
  const { mutate: updateMaterial, isPending } = useUpdateMaterial();

  const handleUpdate = (formData: MaterialFormData) => {
    if (!material) return;

    updateMaterial(
      {
        id: material.id,
        name: formData.name,
        stockQuantity: formData.stockQuantity,
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
      aria-labelledby="edit-material-dialog-title"
      disableRestoreFocus
    >
      <DialogTitle
        id="edit-material-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Edit Material
        <IconButton onClick={onClose} aria-label="Close dialog" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <MaterialForm
          defaultValues={{
            name: material?.name || "",
            stockQuantity: material?.stockQuantity || 0,
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

export default EditMaterialDialog;