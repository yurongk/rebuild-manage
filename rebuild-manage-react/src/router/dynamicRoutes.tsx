// DynamicRoutes.tsx
import { useAppSelector } from "@/hook";
import { RootState } from "@/store";
import { JSX, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "@/components/loading";
import { MenuItem } from "@/pages/menu/menu";
import React from "react";

const DynamicRoutes = () => {
  const { menus } = useAppSelector((state: RootState) => state.menu);

  // 组件映射
  const componentMap: Record<
    string,
    React.LazyExoticComponent<React.ComponentType>
  > = {
    Home: lazy(() => import("@/pages/home")),
    User: lazy(() => import("@/pages/user")),
    Menu: lazy(() => import("@/pages/menu")),
    Dept: lazy(() => import("@/pages/dept")),
    System: lazy(() => import("@/pages/system")),
    Role: lazy(() => import("@/pages/role")),
  };

  // 递归生成 Route 组件
  const renderRoutes = (items: MenuItem[]): JSX.Element[] => {
    return items.map((item) => (
      <Route
        key={item.path}
        path={item.path}
        element={
          item.component ? (
            <Suspense fallback={<Loading />}>
              {React.createElement(componentMap[item.component])}
            </Suspense>
          ) : undefined
        }
      >
        {item.children && renderRoutes(item.children)}
      </Route>
    ));
  };

  return (
    <Routes>
      {renderRoutes(menus)}
      {/* 可选：添加 404 路由 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default DynamicRoutes;
