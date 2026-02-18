import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { Sidebar } from "@/shared/navigation/Sidebar";
import { MobileMenu } from "@/shared/navigation/MobileMenu";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <MobileMenu />

        <Box
          component="main"
          sx={{
            p: 2,

            width: { xs: "100vw", md: "calc(100vw - 240px)" },
            margin: "auto",
            height: "100vh",
            overflow: "auto",
            m: 0,

            "& > *": {
              maxWidth: 1400,
              margin: "auto",
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
