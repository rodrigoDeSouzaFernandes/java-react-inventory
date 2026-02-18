import { Box, Skeleton } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Box>
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Box display="flex" gap={2}>
        <Skeleton height={50} width={100} sx={{ ml: "auto" }} />
        <Skeleton height={50} width={100} />
      </Box>
    </Box>
  );
}
