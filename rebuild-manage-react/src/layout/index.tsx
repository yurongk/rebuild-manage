import { Layout, Menu, MenuProps, Button } from "antd";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";
import { TranslationOutlined } from "@ant-design/icons";
import { useState } from "react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/theme-context";
import { useAppDispatch, useAppSelector } from "@/hook";
import { RootState } from "@/store";
import { logout } from "@/store/modules/authSlice";
import { MenuItem } from "@/pages/menu/menu";
import { getIcon } from "@/utils/icons";

const { Header, Sider, Content } = Layout;

type AntMenuItem = Required<MenuProps>["items"][number];

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const { token, userInfo } = useAppSelector((state: RootState) => state.auth);
  const { menus } = useAppSelector((state: RootState) => state.menu);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const convertToAntMenuItems = (items: MenuItem[]): AntMenuItem[] => {
    return items
      .filter((item) => {
        if (!item.path || !item.component || item.type == 3) return false;
        // 过滤掉没有权限的菜单项
        if (item.permission) {
          const currentRoleIds =
            userInfo?.userRoles?.map((role) => role.roleId) || [];
          const requiredRoles = item.permission
            .split(",")
            .map(Number)
            .filter((n) => !isNaN(n));
          return requiredRoles.some((required) =>
            currentRoleIds.includes(required)
          );
        }
        // 没permission的直接过滤
        return false;
      })
      .map((item) => ({
        key: item.path,
        icon: getIcon(item.icon || "MenuOutlined"),
        label: item.name,
        children: item.children
          ? convertToAntMenuItems(item.children)
          : undefined,
      }));
  };

  const menuItems = convertToAntMenuItems(menus);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme={theme}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          style={{ height: "100%" }}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          theme={theme}
          inlineCollapsed={collapsed}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "var(--secondary-bg)",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              margin: "0 var(--container-margin)",
              fontSize: "var(--base-font-size)",
              color: "var(--primary-text)",
              fontWeight: "bold",
              flex: 1,
            }}
          >
            权限管理系统
          </span>
          <span>
            <ThemeToggle />
            <TranslationOutlined
              style={{
                margin: "0 var(--container-margin)",
                fontSize: "var(--base-font-size)",
                color: "var(--icon-color)",
                cursor: "pointer",
              }}
            />
          </span>
          <Button
            style={{
              margin: "0 var(--container-margin)",
            }}
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            退出登录
          </Button>
        </Header>
        <Content
          style={{
            margin: "var(--container-margin)",
            background: "#fff",
            padding: "var(--container-padding)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
