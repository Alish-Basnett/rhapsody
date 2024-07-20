import React from "react";
import { Tabs, Card, Row, Col, Typography } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import Login from "../components/Login";
import Signup from "../components/Signup";

const { TabPane } = Tabs;
const { Title } = Typography;

const AuthPage = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card>
          <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
            ℝ𝕙𝕒𝕡𝕤𝕠𝕕𝕪
          </Title>
          <Tabs defaultActiveKey="1" centered>
            <TabPane
              tab={
                <span>
                  <LoginOutlined />
                  Login
                </span>
              }
              key="1"
            >
              <Login />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <UserAddOutlined />
                  Signup
                </span>
              }
              key="2"
            >
              <Signup />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default AuthPage;
