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
import { useMemo } from "react";
import { formatCurrency } from "@/utils/currency";
import type { ProductRow } from "../../types";
import DeleteProductDialog from "../DeleteProductDialog/DeleteProductDialog";
import EditProductDialog from "../EditProductDialog";
import { useProductListDialogs } from "./hooks/useProductListDialogs";
import { useNavigate } from "react-router";
import { blue } from "@mui/material/colors";

const ProductsList = () => {
  const navigate = useNavigate();

  const { productibleOnly, handleToogleProductibleOnly } = useProductsFilter();

  const { data: products, isLoading: isProductsListLoading } =
    useProductsList(productibleOnly);

  const {
    isCreateProductDialogOpen,
    setIsCreateProductDialogOpen,
    deleteProductDialogProps,
    editProductDialogProps,
    closeDeleteDialog,
    openDeleteDialog,
    closeEditDialog,
    openEditDialog,
  } = useProductListDialogs();

  const columns = useMemo(
    () =>
      productGridColumns({
        onEdit: openEditDialog,
        onDelete: openDeleteDialog,
      }),
    [],
  );

  const productsRows: ProductRow[] = useMemo(
    () =>
      products
        ? products.map((product) => ({
            ...product,
            value: formatCurrency(product.value),
          }))
        : [],
    [products],
  );

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
        }}
        aria-label="Products header"
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          Products
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={productibleOnly}
                onChange={handleToogleProductibleOnly}
                inputProps={{ "aria-label": "Show productible only products" }}
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
        sx={{
          height: { xs: "calc(100vh - 80px)", sm: "calc(100vh - 150px)" },
          width: "100%",
          flex: "1",
        }}
      >
        <DataGrid
          loading={isProductsListLoading}
          sx={{
            flex: 0,

            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-row:hover [data-field='name'] ": {
              textDecoration: "underline",
              color: blue[700],
            },
          }}
          rows={productsRows}
          columns={columns}
          onRowClick={(params) => {
            navigate(`/products/${params.id}`);
          }}
        />
      </Box>

      <CreateProductDialog
        onClose={() => setIsCreateProductDialogOpen(false)}
        open={isCreateProductDialogOpen}
      />
      <DeleteProductDialog
        {...deleteProductDialogProps}
        onClose={closeDeleteDialog}
      />
      <EditProductDialog
        {...editProductDialogProps}
        onClose={closeEditDialog}
      />
    </Box>
  );
};

export default ProductsList;
