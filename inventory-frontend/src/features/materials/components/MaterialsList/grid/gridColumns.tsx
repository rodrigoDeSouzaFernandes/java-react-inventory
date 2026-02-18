import RowActions from "@/app/components/RowActions";
import type { Material } from "@/features/materials/types";
import type { GridColDef } from "@mui/x-data-grid";

interface MaterialGridColumnsProps {
  onEdit: (row: Material) => void;
  onDelete: (row: Material) => void;
}

export const materialGridColumns = ({
  onEdit,
  onDelete,
}: MaterialGridColumnsProps): GridColDef<Material>[] => [
  { field: "name", headerName: "Name", flex: 4 },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    type: "number",
    flex: 1,
    minWidth: 120,
  },

  {
    field: "actions",
    align: "right",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    width: 70,
    renderCell: (params) => (
      <RowActions row={params.row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];