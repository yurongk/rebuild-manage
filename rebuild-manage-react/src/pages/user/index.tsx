import { Table, Spin, Alert, Tag } from "antd";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { http } from "@/utils/http";
import { DeptUsersType, RoleUsersType, UserType } from "./user";
import { DeptType } from "../dept/dept";

const UserPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [depts, setDepts] = useState<DeptType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 表格列配置
  const columns: ColumnsType<UserType> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "用户名",
      dataIndex: "username",
      width: 150,
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      width: 150,
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      render: (status: number) =>
        status === 1 ? (
          <Tag color="green">启用</Tag>
        ) : (
          <Tag color="red">禁用</Tag>
        ),
    },
    {
      title: "所属部门",
      dataIndex: "deptUsers",
      render: (deptUsers: DeptUsersType[]) => {
        return deptUsers.map((i) => {
          const dept = depts.find((dept) => dept.id === i.deptId);
          return dept ? <Tag key={dept.id}>{dept.name}</Tag> : null;
        });
      },
    },
    {
      title: "用户角色",
      dataIndex: "userRoles",
      render: (userRoles: RoleUsersType[]) => userRoles.join(", "),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: 200,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      width: 200,
    },
  ];

  // 获取用户数据
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: users } = await http.get("/user");
        const { data: depts } = await http.get("/dept");
        setUsers(users);
        setDepts(depts);
      } catch (err) {
        setError("获取用户数据失败，请稍后重试");
        console.error("获取用户列表失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <Alert
        message="错误提示"
        description={error}
        type="error"
        showIcon
        style={{ margin: "var(--container-margin)" }}
      />
    );
  }

  return (
    <div style={{ padding: "var(--container-padding)" }}>
      <Spin spinning={loading} tip="数据加载中...">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          bordered
          scroll={{ x: 1300 }}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total) => `共 ${total} 条数据`,
          }}
        />
      </Spin>
    </div>
  );
};

export default UserPage;
