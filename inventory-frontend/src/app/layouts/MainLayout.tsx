import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { Sidebar } from "@/shared/navigation/Sidebar";
import { MobileMenu } from "@/shared/navigation/MobileMenu";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <MobileMenu />

        <Box component="main" sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
