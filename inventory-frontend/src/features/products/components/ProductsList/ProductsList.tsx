import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useProductsFilter } from "../../hooks/useProductsFilter";

const mockProducts = [
  { id: 1, name: "Product A", value: 100, producibleQuantity: 5 },
  { id: 2, name: "Product B", value: 200, producibleQuantity: 0 },
  { id: 3, name: "Product C", value: 150, producibleQuantity: 2 },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "value", headerName: "Value", type: "number", flex: 1 },
  {
    field: "producibleQuantity",
    headerName: "Producible Qty",
    type: "number",
    flex: 1,
  },
];

const ProductsList = () => {
  const { productibleOnly, handleToogleProductibleOnly } = useProductsFilter();

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
        aria-label="Products header"
      >
        <Typography component="h1" variant="h4">
          Products
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <FormControlLabel
            control={
              <Switch
                checked={productibleOnly}
                onChange={handleToogleProductibleOnly}
                inputProps={{ "aria-label": "Show producible only products" }}
              />
            }
            label="Producible only"
          />
          <Button variant="contained" color="primary">
            Create new Product
          </Button>
        </Box>
      </Box>

      <Box
        component="section"
        aria-label="Products table"
        sx={{ height: 400, width: "100%" }}
      >
        <DataGrid sx={{flex: 0}} rows={mockProducts} columns={columns} autoHeight />
      </Box>
    </Box>
  );
};

export default ProductsList;
