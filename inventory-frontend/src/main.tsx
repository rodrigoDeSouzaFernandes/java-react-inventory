import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query";

import "./index.css";
import App from "@/App";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { CustomSnackbarProvider } from "./app/providers/SnackbarProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <CustomSnackbarProvider>
          <App />
          <CssBaseline />
        </CustomSnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
