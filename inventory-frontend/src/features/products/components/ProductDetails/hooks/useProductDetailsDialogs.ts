import { useState } from "react";
import type { MaterialRow } from "../types";

export const useProductDetailsDialogs = () => {
  const [addMaterialDialogOpen, setAddMaterialDialogOpen] =
    useState<boolean>(false);

  const [editMaterialQuantityDialogProps, setEditMaterialQuantityDialogProps] =
    useState<{
      open: boolean;
      material: MaterialRow | null;
    }>({
      open: false,
      material: null,
    });

  const [removeMaterialDialogProps, setRemoveMaterialDialogProps] = useState<{
    open: boolean;
    material: MaterialRow | null;
  }>({
    open: false,
    material: null,
  });

  const openAddMaterialDialog = () => setAddMaterialDialogOpen(true);
  const closeAddMaterialDialog = () => setAddMaterialDialogOpen(false);

  const openEditMaterialQuantityDialog = (material: MaterialRow) => {
    setEditMaterialQuantityDialogProps({ open: true, material });
  };
  const closeEditMaterialQuantityDialog = () =>
    setEditMaterialQuantityDialogProps({ open: false, material: null });

  const openRemoveMaterialDialog = (material: MaterialRow) => {
    setRemoveMaterialDialogProps({ open: true, material });
  };
  const closeRemoveMaterialDialog = () =>
    setRemoveMaterialDialogProps({ open: false, material: null });

  return {
    addMaterialDialogOpen,
    editMaterialQuantityDialogProps,
    removeMaterialDialogProps,
    closeAddMaterialDialog,
    closeEditMaterialQuantityDialog,
    closeRemoveMaterialDialog,
    openAddMaterialDialog,
    openEditMaterialQuantityDialog,
    openRemoveMaterialDialog,
  };
};
