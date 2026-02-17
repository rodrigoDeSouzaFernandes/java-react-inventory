import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "./menuItems";



export const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "primary.main",
          color: "white",
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="h6" component="h1" noWrap>
          Inventory
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open menu"
          onClick={toggleDrawer}
          edge="end"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 350,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "primary.main",
            color: "white",
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="h6" component="h1" noWrap>
            Inventory
          </Typography>
          <IconButton
            color="inherit"
            aria-label="close menu"
            onClick={toggleDrawer}
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {menuItems.map(({ text, path, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={path}
                onClick={toggleDrawer}
                sx={{
                  "&.active": {
                    bgcolor: "primary.main",
                    color: "white",
                    "& .MuiListItemIcon-root": { color: "white" },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
