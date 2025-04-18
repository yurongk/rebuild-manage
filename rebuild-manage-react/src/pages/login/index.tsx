import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { http } from "@/utils/http";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/modules/authSlice";

// 定义表单字段的类型
interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values: LoginFormValues) => {
    try {
      /*
      **
      ✅ 最佳实践：登录成功后的流程
      1. 登录接口返回 token + userInfo
      2. 将 token 和 userInfo 保存到 localStorage（防止刷新丢失）
      3. 同时将 userInfo 存入 Redux 状态（方便组件之间共享）
      4. 刷新页面时，通过 localStorage 恢复 Redux 状态
      **
      */
      const res = await http.post("/auth/login", values);
      const { token, userInfo } = res.data;
      dispatch(setAuth({ token, userInfo }));
      navigate("/home");
      message.success("登录成功");
    } catch (err) {
      console.error(err);
      message.error("登录失败，请检查用户名或密码");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="登录" style={{ width: "30vw" }}>
        <Form<LoginFormValues> name="login" onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
