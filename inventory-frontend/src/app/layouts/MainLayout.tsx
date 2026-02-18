import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { Sidebar } from "@/shared/navigation/Sidebar";
import { MobileMenu } from "@/shared/navigation/MobileMenu";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{ p: 0, overflow: { xs: "auto", sm: "inherit" }, width: "100%" }}
      >
        <MobileMenu />
        <Box
          sx={{
            p: { xs: 0, sm: 2 },

            width: { xs: "100%", md: "calc(100vw - 240px)" },
            maxWidth: "100vw",
            margin: "auto",
            height: { xs: "auto", md: "100vh" },
            overflow: { sm: "auto" },
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
