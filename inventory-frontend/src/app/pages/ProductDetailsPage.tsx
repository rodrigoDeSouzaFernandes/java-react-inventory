import ProductDetails from "@/features/products/components/ProductDetails";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Box>
        <Typography>Product ID not found</Typography>
      </Box>
    );
  }

  return <ProductDetails productId={parseInt(id)} />;
}
