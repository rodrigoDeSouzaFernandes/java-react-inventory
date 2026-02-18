import { createBrowserRouter, Navigate } from "react-router";
import ProductsPage from "./app/pages/ProductsPage";
import MaterialsPage from "./app/pages/MaterialsPage";
import ProductDetailsPage from "./app/pages/ProductDetailsPage";
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
        path: "/products/:id",
        Component: ProductDetailsPage,
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
