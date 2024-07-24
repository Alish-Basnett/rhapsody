import React, { useState } from "react";
import { Tabs, Card, Row, Col, Typography } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "../assets/styles/AuthPage.css";

const { TabPane } = Tabs;
const { Title } = Typography;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Row justify="center" align="middle" className="auth-page-container">
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card>
          <Tabs defaultActiveKey="1" centered onChange={handleTabChange}>
            <TabPane
              tab={
                <span>
                  <LoginOutlined />
                  Login
                </span>
              }
              key="1"
            >
              <div
                className={`tab-content ${
                  activeTab === "1" ? "fade-in" : "fade-out"
                }`}
              >
                <Login />
              </div>
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
              <div
                className={`tab-content ${
                  activeTab === "2" ? "fade-in" : "fade-out"
                }`}
              >
                <Signup />
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default AuthPage;
