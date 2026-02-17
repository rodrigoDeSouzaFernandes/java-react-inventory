import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useProductsFilter } from "../../hooks/useProductsFilter";
import { useProductsList } from "../../hooks/useProductsList";

import { Add } from "@mui/icons-material";
import { productGridColumns } from "./grid/gridColumns";
import CreateProductDialog from "../CreateProductDialog";
import { useState } from "react";

const ProductsList = () => {
  const columns = productGridColumns({
    onEdit: (e) => console.log(e),
    onDelete: (e) => console.log(e),
  });

  const { productibleOnly, handleToogleProductibleOnly } = useProductsFilter();

  const { data: products, isLoading: isProductsListLoading } =
    useProductsList(productibleOnly);

  const [isCreateProductDialogOpen, setIsCreateProductDialogOpen] =
    useState<boolean>(false);

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
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsCreateProductDialogOpen(true)}
          >
            Add new Product
          </Button>
        </Box>
      </Box>

      <Box
        component="section"
        aria-label="Products table"
        sx={{ height: 400, width: "100%" }}
      >
        <DataGrid
          loading={isProductsListLoading}
          sx={{ flex: 0 }}
          rows={products}
          columns={columns}
          autoHeight
        />
      </Box>

      <CreateProductDialog
        onClose={() => setIsCreateProductDialogOpen(false)}
        open={isCreateProductDialogOpen}
      />
    </Box>
  );
};

export default ProductsList;
