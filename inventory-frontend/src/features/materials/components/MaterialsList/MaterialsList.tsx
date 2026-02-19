import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMaterialsList } from "../../hooks/useMaterialsList";

import { Add } from "@mui/icons-material";
import { materialGridColumns } from "./grid/gridColumns";
import CreateMaterialDialog from "../CreateMaterialDialog";
import type { Material } from "../../types";
import DeleteMaterialDialog from "../DeleteMaterialDialog/DeleteMaterialDialog";
import EditMaterialDialog from "../EditMaterialDialog";
import { useMaterialListDialogs } from "./hooks/useMaterialListDialogs";

const MaterialsList = () => {
  const { data: materials, isLoading: isMaterialsListLoading } =
    useMaterialsList();

  const {
    isCreateMaterialDialogOpen,
    setIsCreateMaterialDialogOpen,
    deleteMaterialDialogProps,
    editMaterialDialogProps,
    closeDeleteDialog,
    openDeleteDialog,
    closeEditDialog,
    openEditDialog,
  } = useMaterialListDialogs();

  const columns = materialGridColumns({
    onEdit: openEditDialog,
    onDelete: openDeleteDialog,
  });

  const materialsRows: Material[] = materials || [];

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
        aria-label="Materials header"
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          Materials
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsCreateMaterialDialogOpen(true)}
          >
            Add new Material
          </Button>
        </Box>
      </Box>

      <Box
        component="section"
        aria-label="Materials table"
        sx={{
          height: { xs: "calc(100vh - 80px)", sm: "calc(100vh - 150px)" },
          width: "100%",
          flex: "1",
        }}
      >
        <DataGrid
          loading={isMaterialsListLoading}
          rows={materialsRows}
          columns={columns}
        />
      </Box>

      <CreateMaterialDialog
        onClose={() => setIsCreateMaterialDialogOpen(false)}
        open={isCreateMaterialDialogOpen}
      />
      <DeleteMaterialDialog
        {...deleteMaterialDialogProps}
        onClose={closeDeleteDialog}
      />
      <EditMaterialDialog
        {...editMaterialDialogProps}
        onClose={closeEditDialog}
      />
    </Box>
  );
};

export default MaterialsList;
