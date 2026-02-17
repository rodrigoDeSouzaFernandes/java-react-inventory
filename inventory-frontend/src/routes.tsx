import { createBrowserRouter } from "react-router";
import ProductsPage from "./pages/ProductsPage";

export const router = createBrowserRouter([
  {
    index: true,
    Component: ProductsPage,
  },
  {
    path: "*",
    element: <p>Not found</p>,
  },
]);
