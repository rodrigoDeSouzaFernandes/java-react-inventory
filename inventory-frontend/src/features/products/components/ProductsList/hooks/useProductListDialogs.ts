import { useState } from "react";
import type { ProductDialogData } from "../types";
import type { ProductRow } from "@/features/products/types";

const CLOSED_MODAL: ProductDialogData = { open: false, product: null };

export const useProductListDialogs = () => {
  const [isCreateProductDialogOpen, setIsCreateProductDialogOpen] =
    useState<boolean>(false);

  const [deleteProductDialogProps, setDeleteProductDialogProps] =
    useState<ProductDialogData>(CLOSED_MODAL);

  const [editProductDialogProps, setEditProductDialogProps] =
    useState<ProductDialogData>(CLOSED_MODAL);

  const openDeleteDialog = (productRow: ProductRow) =>
    setDeleteProductDialogProps({ open: true, product: productRow });

  const closeDeleteDialog = () => setDeleteProductDialogProps(CLOSED_MODAL);

  const closeEditDialog = () => setEditProductDialogProps(CLOSED_MODAL);

  const openEditDialog = (productRow: ProductRow) => {
    setEditProductDialogProps({ open: true, product: productRow });
  };

  return {
    isCreateProductDialogOpen,
    setIsCreateProductDialogOpen,
    deleteProductDialogProps,
    setDeleteProductDialogProps,
    editProductDialogProps,
    setEditProductDialogProps,
    closeDeleteDialog,
    openDeleteDialog,
    closeEditDialog,
    openEditDialog,
  };
};
