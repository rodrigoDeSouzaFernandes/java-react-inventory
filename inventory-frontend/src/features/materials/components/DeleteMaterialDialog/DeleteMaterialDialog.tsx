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
import type { Material } from "../../types";
import { useDeleteMaterial } from "../../hooks/useDeleteMaterial";

export interface DeleteMaterialDialogProps {
  open: boolean;
  onClose: () => void;
  material: Material | null;
}

const DeleteMaterialDialog = ({
  open,
  onClose,
  material,
}: DeleteMaterialDialogProps) => {
  const { mutate: deleteMaterialById, isPending } = useDeleteMaterial();

  const handleDelete = (id: number) => {
    deleteMaterialById(id, {
      onSuccess: onClose,
    });
  };

  if (!material) return;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      disableRestoreFocus
      aria-labelledby="delete-material-dialog-title"
      aria-describedby="delete-material-dialog-description"
    >
      <DialogTitle id="delete-material-dialog-title">Delete Material</DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>Warning</AlertTitle>
          This action is irreversible and will delete all data related to this
          material.
        </Alert>

        <Typography id="delete-material-dialog-description" sx={{ mb: 2 }}>
          Are you sure you want to delete the material "{material?.name}"?
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
            onClick={() => handleDelete(material?.id)}
            sx={{ width: { xs: "100%", sm: 120 } }}
            aria-label={`Delete material ${material?.name}`}
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

export default DeleteMaterialDialog;