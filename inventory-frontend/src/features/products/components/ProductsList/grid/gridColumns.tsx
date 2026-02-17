import RowActions from "@/app/components/RowActions";
import type { Product } from "@/features/products/types";
import type { GridColDef } from "@mui/x-data-grid";

interface ProductGridColumnsProps {
  onEdit: (row: Product) => void;
  onDelete: (row: Product) => void;
}

export const productGridColumns = ({
  onEdit,
  onDelete,
}: ProductGridColumnsProps): GridColDef<Product>[] => [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "value", headerName: "Value", type: "number", flex: 1 },
  {
    field: "producibleQuantity",
    headerName: "Producible Qty",
    type: "number",
    flex: 1,
  },

  {
    field: "actions",
    align: 'right',
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
