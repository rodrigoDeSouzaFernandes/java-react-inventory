import RowActions from "@/app/components/RowActions";
import type { ProductRow } from "@/features/products/types";
import { parseCurrencyToNumber } from "@/utils/currency";
import type { GridColDef } from "@mui/x-data-grid";

interface ProductGridColumnsProps {
  onEdit: (row: ProductRow) => void;
  onDelete: (row: ProductRow) => void;
}

export const productGridColumns = ({
  onEdit,
  onDelete,
}: ProductGridColumnsProps): GridColDef<ProductRow>[] => [
  { field: "name", headerName: "Name", flex: 4, minWidth: 150 },
  {
    field: "value",
    headerName: "Value",
    align: "left",
    flex: 1,
    minWidth: 120,
    sortComparator: (a, b) =>
      parseCurrencyToNumber(a) - parseCurrencyToNumber(b),
  },
  {
    field: "producibleQuantity",
    headerName: "Producible Qty",
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
