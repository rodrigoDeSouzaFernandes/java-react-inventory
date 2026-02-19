import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import { Construction } from "@mui/icons-material";

export const menuItems = [
  { text: "Products", path: "/products", icon: <Inventory2Icon /> },
  { text: "Raw Materials", path: "/raw-materials", icon: <CategoryIcon /> },
  { text: "Production Suggestion", path: "/production-suggestion", icon: <Construction /> },
];
