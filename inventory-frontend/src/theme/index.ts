import "@mui/x-data-grid/themeAugmentation";
import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { enUS as dataGridEnUS } from "@mui/x-data-grid/locales";

const baseTheme: ThemeOptions = {
  components: {
    MuiDataGrid: {
      defaultProps: {
        rowHeight: 52,
        disableColumnMenu: true,
        disableColumnResize: true,
        disableColumnFilter: true,
        hideFooter: true,
        showToolbar: true,
        localeText: {
          noRowsLabel: "No rows found",
          noResultsOverlayLabel: "No results found",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
        maxWidth: "sm",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
};

export const lightTheme = createTheme(
  {
    ...baseTheme,
    palette: {
      mode: "light",
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      primary: {
        main: "#1976d2",
      },
    },
  },
  dataGridEnUS,
);

export const darkTheme = createTheme(
  {
    ...baseTheme,
    palette: {
      mode: "dark",
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      primary: {
        main: "#8ebfff",
      },
    },
  },
  dataGridEnUS,
);
