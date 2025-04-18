// router.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "@/layout";
import Loading from "@/components/loading"; // 自定义加载组件
import AuthRoute from "./authRoute";
import React from "react";
import DynamicRoutes from "./dynamicRoutes";
const LoginPage = lazy(() => import("@/pages/login"));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          // 动态路由占位
          {
            path: "*",
            element: <DynamicRoutes />, // 使用组件处理动态路由
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: withSuspense(LoginPage),
  },
]);

export default router;
