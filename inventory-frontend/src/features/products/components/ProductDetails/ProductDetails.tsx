import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useProduct } from "../../hooks/useProduct";
import { Add } from "@mui/icons-material";
import { productDetailsGridColumns } from "./grid/gridColumns";
import { formatCurrency } from "@/utils/currency";

interface ProductDetailsProps {
  productId: number;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const { data: product, isLoading } = useProduct(productId);

  if (isLoading || !product) {
    return <Typography>Loading...</Typography>;
  }

  const handleAddMaterial = () => {
    console.log("Add material");
  };

  const columns = productDetailsGridColumns({
    onEdit: (material) => console.log("Edit material", material),
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
            {product.name}
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
                {formatCurrency(product.value)}
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
              <Typography variant="h6">{product.producibleQuantity}</Typography>
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
          onClick={handleAddMaterial}
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
          rows={product.materials}
          columns={columns}
          autoHeight
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
};

export default ProductDetails;
