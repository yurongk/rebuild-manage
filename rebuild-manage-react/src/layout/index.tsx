// src/layout/index.tsx
import { Layout, Menu } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const items = [
  { label: "首页", key: "/" },
  { label: "用户管理", key: "/user" },
  { label: "菜单管理", key: "/menu" },
  { label: "部门管理", key: "/dept" },
  { label: "角色管理", key: "/role" },
  { label: "系统配置", key: "/system" },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>后台管理系统</Header>
        <Content style={{ margin: 24, background: "#fff", padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
