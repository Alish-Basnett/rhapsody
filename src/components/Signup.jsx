import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    setLoading(true); // Set loading to true when starting signup
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      setError(""); // Clear any previous errors
      navigate("/"); // Redirect to the home page upon successful signup
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false); // Set loading to false after signup attempt
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      {/* <Title level={2} style={{ textAlign: "center" }}>
        Signup
      </Title> */}
      <Form
        name="signup_form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            suffix={
              <Button
                type="text"
                icon={
                  passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
                onClick={handlePasswordVisibility}
              />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirm-password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type={passwordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            suffix={
              <Button
                type="text"
                icon={
                  passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
                onClick={handlePasswordVisibility}
              />
            }
          />
        </Form.Item>
        {error && (
          <Form.Item>
            <Typography.Text type="danger">{error}</Typography.Text>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
