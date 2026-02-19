import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useProductionSuggestion } from "../../hooks/useProductionSuggestion";
import { formatCurrency } from "@/utils/currency";

import { useMemo } from "react";
import { green } from "@mui/material/colors";

const columns = [
  { field: "name", headerName: "Product", flex: 2 },
  { field: "unitValue", headerName: "Unit Value", flex: 1 },
  { field: "quantity", headerName: "Quantity", flex: 1 },
  { field: "total", headerName: "Total", flex: 1 },
];

const ProductionSuggestionList = () => {
  const { data, isLoading } = useProductionSuggestion();

  const grandTotal = data?.grandTotal ?? 0;

  const rows = useMemo(
    () =>
      data?.items.map((item) => ({
        id: item.productId,
        name: item.productName,
        unitValue: formatCurrency(item.unitValue),
        quantity: item.producibleQuantity,
        total: formatCurrency(item.totalValue),
      })) || [],
    [data],
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
        }}
        aria-label="Production Suggestions header"
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          Production Suggestions
        </Typography>

        <Box
          sx={{
            bgcolor: "background.paper",
            px: 4,
            py: 1,
            borderRadius: 2,
            boxShadow: 1,
            gap: 1,
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>Total Value:</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: green[700] }}>
            {formatCurrency(grandTotal)}
          </Typography>
        </Box>
      </Box>

      <Box
        component="section"
        aria-label="Production Suggestions table"
        sx={{
          height: { xs: "calc(100vh - 80px)", sm: "calc(100vh - 150px)" },
          width: "100%",
          flex: 1,
        }}
      >
        <DataGrid loading={isLoading} rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default ProductionSuggestionList;
