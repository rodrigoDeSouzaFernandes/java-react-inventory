import { styled } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { MaterialDesignContent, SnackbarProvider } from "notistack";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: green[50],
    color: green[900],
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: red[50],
    color: red[900],
  },
}));

interface CustomSnackbarProviderProps {
  children: React.ReactNode;
}

export const CustomSnackbarProvider = ({
  children,
}: CustomSnackbarProviderProps) => {
  return (
    <SnackbarProvider
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={4000}
    >
      {children}
    </SnackbarProvider>
  );
};
