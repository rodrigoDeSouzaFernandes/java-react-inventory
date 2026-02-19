import { createBrowserRouter, Navigate } from "react-router";
import ProductsPage from "./app/pages/ProductsPage";
import MaterialsPage from "./app/pages/MaterialsPage";
import ProductDetailsPage from "./app/pages/ProductDetailsPage";
import MainLayout from "./app/layouts/MainLayout";
import ProductionSuggestionPage from "./app/pages/ProductionSuggestionPage";

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
        path: "/production-suggestion",
        Component: ProductionSuggestionPage,
      },
      {
        path: "*",
        element: <p>Not found</p>,
      },
    ],
  },
]);
