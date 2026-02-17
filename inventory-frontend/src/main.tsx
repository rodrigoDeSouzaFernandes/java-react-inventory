import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query";

import "./index.css";
import App from "@/App";
import { ThemeProvider } from "./app/providers/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <CssBaseline />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
