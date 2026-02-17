import { NavLink } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { menuItems } from "./menuItems";

interface SidebarProps {
  onLinkClick?: () => void;
}

export const Sidebar = ({ onLinkClick }: SidebarProps) => {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      sx={{
        width: 240,
        flexShrink: 0,
        height: "100vh",
        display: { xs: "none", md: "block" },
        bgcolor: theme.palette.primary.dark,
      }}
      aria-label="Main navigation"
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="h1"
          noWrap
          color={theme.palette.primary.contrastText}
        >
          Inventory
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map(({ text, path, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={path}
              onClick={onLinkClick}
              sx={{
                color: theme.palette.primary.contrastText,

                "&.active": {
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.contrastText,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
