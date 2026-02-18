import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  AlertTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useProduct } from "../../hooks/useProduct";
import { Add } from "@mui/icons-material";
import { productDetailsGridColumns } from "./grid/gridColumns";
import { formatCurrency } from "@/utils/currency";
import AddProductRawMaterialDialog from "../AddProductRawMaterialDialog/AddProductRawMaterialDialog";
import { useState } from "react";
import EditProductRawMaterialDialog from "../EditProductRawMaterialDialog/EditProductRawMaterialDialog";
import type { MaterialRow } from "./types";

interface ProductDetailsProps {
  productId: number;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const { data: product, isLoading, isError } = useProduct(productId);

  const [addMaterialDialogOpen, setAddMaterialDialogOpen] =
    useState<boolean>(false);

  const [editMaterialQuantityDialogProps, setEditMaterialQuantityDialogProps] =
    useState<{
      open: boolean;
      material: MaterialRow | null;
    }>({
      open: false,
      material: null,
    });

  const closeAddMaterialDialog = () => setAddMaterialDialogOpen(false);
  const openAddMaterialDialog = () => setAddMaterialDialogOpen(true);

  const closeEditMaterialQuantityDialog = () =>
    setEditMaterialQuantityDialogProps({ open: false, material: null });

  const openEditMaterialQuantityDialog = (material: MaterialRow) => {
    setEditMaterialQuantityDialogProps({ open: true, material });
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError || !product) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <Typography>
          Something went wrong while loading the product data. Please try again.
        </Typography>
      </Alert>
    );
  }

  const columns = productDetailsGridColumns({
    onEdit: openEditMaterialQuantityDialog,
    onDelete: (material) => console.log("Delete material", material),
  });

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3, p: 2, pb: 0 }}>
        <CardContent>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: 600, mb: 2 }}
          >
            {product?.name}
          </Typography>
          <Grid
            container
            sx={{ display: "flex", flexWrap: "wrap" }}
            spacing={2}
          >
            <Grid
              sx={{
                flex: 1,
                minWidth: 125,
                backgroundColor: "background.default",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Value
              </Typography>
              <Typography variant="h6">
                {formatCurrency(product?.value || 0)}
              </Typography>
            </Grid>

            <Grid
              sx={{
                flex: 1,
                minWidth: 125,
                backgroundColor: "background.default",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Producible Quantity
              </Typography>
              <Typography variant="h6">
                {product?.producibleQuantity}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
        }}
        aria-label="Product details header"
      >
        <Typography component="h2" variant="h4">
          Product raw materials
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={openAddMaterialDialog}
          sx={{ ml: "auto", mb: 2 }}
        >
          Add Material
        </Button>
      </Box>

      <Box
        component="section"
        aria-label="Materials table"
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <DataGrid
          loading={isLoading}
          rows={product?.materials || []}
          columns={columns}
          autoHeight
          getRowId={(row) => row.id}
        />
      </Box>

      <AddProductRawMaterialDialog
        open={addMaterialDialogOpen}
        onClose={closeAddMaterialDialog}
        product={product}
      />
      <EditProductRawMaterialDialog
        {...editMaterialQuantityDialogProps}
        onClose={closeEditMaterialQuantityDialog}
        product={product}
      />
    </Box>
  );
};

export default ProductDetails;
