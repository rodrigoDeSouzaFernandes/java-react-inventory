import { useState } from "react";
import type { MaterialDialogData } from "../types";
import type { Material } from "@/features/materials/types";

const CLOSED_MODAL: MaterialDialogData = { open: false, material: null };

export const useMaterialListDialogs = () => {
  const [isCreateMaterialDialogOpen, setIsCreateMaterialDialogOpen] =
    useState<boolean>(false);

  const [deleteMaterialDialogProps, setDeleteMaterialDialogProps] =
    useState<MaterialDialogData>(CLOSED_MODAL);

  const [editMaterialDialogProps, setEditMaterialDialogProps] =
    useState<MaterialDialogData>(CLOSED_MODAL);

  const openDeleteDialog = (material: Material) =>
    setDeleteMaterialDialogProps({ open: true, material });

  const closeDeleteDialog = () => setDeleteMaterialDialogProps(CLOSED_MODAL);

  const closeEditDialog = () => setEditMaterialDialogProps(CLOSED_MODAL);

  const openEditDialog = (material: Material) => {
    setEditMaterialDialogProps({ open: true, material });
  };

  return {
    isCreateMaterialDialogOpen,
    setIsCreateMaterialDialogOpen,
    deleteMaterialDialogProps,
    setDeleteMaterialDialogProps,
    editMaterialDialogProps,
    setEditMaterialDialogProps,
    closeDeleteDialog,
    openDeleteDialog,
    closeEditDialog,
    openEditDialog,
  };
};