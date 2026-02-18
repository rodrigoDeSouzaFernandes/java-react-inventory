import { createBrowserRouter, Navigate } from "react-router";
import ProductsPage from "./app/pages/ProductsPage";
import MaterialsPage from "./app/pages/MaterialsPage";
import MainLayout from "./app/layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Navigate to={"/products"} />,
      },
      {
        path: "/products",
        Component: ProductsPage,
      },
      {
        path: "/raw-materials",
        Component: MaterialsPage,
      },
      {
        path: "*",
        element: <p>Not found</p>,
      },
    ],
  },
]);
