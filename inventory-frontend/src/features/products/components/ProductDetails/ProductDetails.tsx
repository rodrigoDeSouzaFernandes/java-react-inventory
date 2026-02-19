import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  AlertTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useProduct } from "../../hooks/useProduct";
import { Add, ArrowBack } from "@mui/icons-material";
import { productDetailsGridColumns } from "./grid/gridColumns";
import { formatCurrency } from "@/utils/currency";
import AddProductRawMaterialDialog from "../AddProductRawMaterialDialog/AddProductRawMaterialDialog";
import { useMemo, useState } from "react";
import EditProductRawMaterialDialog from "../EditProductRawMaterialDialog/EditProductRawMaterialDialog";
import type { MaterialRow } from "./types";
import RemoveMaterialFromProductDialog from "../RemoveMaterialFromProductDialog";
import { useNavigate } from "react-router";
import { useProductDetailsDialogs } from "./hooks/useProductDetailsDialogs";

interface ProductDetailsProps {
  productId: number;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useProduct(productId);

  const {
    addMaterialDialogOpen,
    closeAddMaterialDialog,
    closeEditMaterialQuantityDialog,
    closeRemoveMaterialDialog,
    editMaterialQuantityDialogProps,
    openAddMaterialDialog,
    openEditMaterialQuantityDialog,
    openRemoveMaterialDialog,
    removeMaterialDialogProps,
  } = useProductDetailsDialogs();

  const columns = useMemo(
    () =>
      productDetailsGridColumns({
        onEdit: openEditMaterialQuantityDialog,
        onDelete: openRemoveMaterialDialog,
      }),
    [],
  );

  if (isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <Typography>
          Something went wrong while loading the product data. Please try again.
        </Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3, p: 2, pb: 0 }}>
        <CardContent>
          <Stack direction={"row"} alignItems={"center"} mb={2} gap={2}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: 600 }}
              fontSize={{ xs: 32, sm: 40 }}
            >
              {product?.name}
            </Typography>
          </Stack>
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
          gap: 2,
        }}
        aria-label="Product details header"
      >
        <Typography component="h2" variant="h4" fontSize={{ xs: 24, sm: 32 }}>
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
          height: { xs: "100%", sm: "calc(100vh - 380px)" },
          maxheight: { xs: "calc(100vh - 80px)", sm: "calc(100vh - 380px)" },
          width: "100%",
          flex: "1",
        }}
      >
        <DataGrid
          loading={isLoading}
          rows={product?.materials || []}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </Box>

      {product && (
        <>
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

          <RemoveMaterialFromProductDialog
            {...removeMaterialDialogProps}
            onClose={closeRemoveMaterialDialog}
            product={product}
          />
        </>
      )}
    </Box>
  );
};

export default ProductDetails;
