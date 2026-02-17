import { createBrowserRouter, Navigate } from "react-router";
import ProductsPage from "./app/pages/ProductsPage";
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
        element: <p>TODO</p>,
      },
      {
        path: "*",
        element: <p>Not found</p>,
      },
    ],
  },
]);
