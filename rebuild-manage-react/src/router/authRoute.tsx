import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hook";
import { fetchMenus } from "@/store/modules/menuSlice";
import Loading from "@/components/loading";
import { MenuItem } from "@/pages/menu/menu";

const AuthRoute = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { token, userInfo } = useAppSelector((state) => state.auth);
  const { menus, loading } = useAppSelector((state) => state.menu);

  useEffect(() => {
    if (token && menus.length === 0 && !loading) {
      dispatch(fetchMenus());
    }
  }, [token, menus, loading, dispatch]);
  // 当前用户角色ID
  const currentRoleIds = userInfo?.userRoles?.map((role) => role.roleId) || [];

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loading || menus.length === 0) {
    return <Loading />;
  }

  // 权限校验主逻辑
  const checkPermission = () => {
    const findMenuByPath = (items: MenuItem[]): MenuItem | undefined => {
      for (const item of items) {
        if (item.path === location.pathname) return item;
        if (item.children) {
          const found = findMenuByPath(item.children);
          if (found) return found;
        }
      }
    };

    const currentMenu = findMenuByPath(menus);
    if (!currentMenu || !currentMenu.permission) return false; // 没有找到对应的菜单项，表示没有权限

    // 转换权限要求为数字数组
    const requiredRoles = currentMenu.permission
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));

    // 检查角色交集
    const hasPermission = requiredRoles.some((required) =>
      currentRoleIds.includes(required)
    );

    return hasPermission;
  };
  const hasPermission = checkPermission();

  if (!hasPermission) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
