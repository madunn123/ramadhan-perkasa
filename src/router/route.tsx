import MainPage from "@/pages/main.page";
import { createBrowserRouter, RouterProvider } from "react-router";

export default function Route() {
  const routePath = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
  ]);

  return <RouterProvider router={routePath} />;
}
