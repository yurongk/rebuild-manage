import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layout";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import UserPage from "@/pages/user";
import MenuPage from "@/pages/menu";
import DeptPage from "@/pages/dept";
import SystemPage from "@/pages/system";
import RolePage from "@/pages/role";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "user", element: <UserPage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "dept", element: <DeptPage /> },
      { path: "role", element: <RolePage /> },
      { path: "system", element: <SystemPage /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
]);

export default router;
