import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MaterialForm from "../MaterialForm";
import { useCreateMaterial } from "../../hooks/useCreateMaterial";
import type { MaterialFormData } from "../MaterialForm/types";

interface CreateMaterialDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateMaterialDialog = ({ open, onClose }: CreateMaterialDialogProps) => {
  const { mutate: createMaterial, isPending } = useCreateMaterial();

  const create = (formData: MaterialFormData) => {
    createMaterial(
      {
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
      aria-labelledby="create-material-dialog-title"
      disableRestoreFocus
    >
      <DialogTitle
        id="create-material-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Create Material
        <IconButton onClick={onClose} aria-label="Close dialog" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <MaterialForm
          onSubmit={create}
          onCancel={onClose}
          isLoading={isPending}
          submitLabel="Create Material"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateMaterialDialog;