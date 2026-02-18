import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { useState } from "react";

interface RowActionsProps<T> {
  row: T;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}

function RowActions<T>({ row, onEdit, onDelete }: RowActionsProps<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    handleClose();
    onEdit(row);
  };

  const handleDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    handleClose();
    onDelete(row);
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <GridMoreVertIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit} sx={{ gap: 1 }}>
          <Edit sx={{ width: 18 }} />
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ gap: 1 }}>
          <Delete sx={{ width: 18, color: "error.main" }} />
          <Typography color="error.main">Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default RowActions;
