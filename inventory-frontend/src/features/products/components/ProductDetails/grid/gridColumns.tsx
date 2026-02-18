import RowActions from "@/app/components/RowActions";
import type { GridColDef } from "@mui/x-data-grid";

interface MaterialRow {
  id: number;
  name: string;
  stockQuantity: number;
  requiredQuantity: number;
}

interface ProductDetailsGridColumnsProps {
  onEdit: (material: MaterialRow) => void;
  onDelete: (material: MaterialRow) => void;
}

export const productDetailsGridColumns = ({
  onEdit,
  onDelete,
}: ProductDetailsGridColumnsProps): GridColDef<MaterialRow>[] => [
  {
    field: "name",
    headerName: "Name",
    flex: 4,
    minWidth: 140,
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    type: "number",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "requiredQuantity",
    headerName: "Required Quantity",
    type: "number",
    flex: 1,
    minWidth: 140,
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
