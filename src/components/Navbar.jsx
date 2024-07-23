import React from "react";
import { Menu, Input, Select, Button } from "antd";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from "../hooks/useUser";
import { GlobalOutlined, SearchOutlined } from "@ant-design/icons";
import rhapsodyLogo from "../assets/images/rhapsody-main-logo.png";

const { Option } = Select;

const Navbar = () => {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setUser(null); // Update the user state to null
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "white",
        color: "black",
      }}
    >
      {/* Logo */}
      <img
        src={rhapsodyLogo}
        alt="Rhapsody Logo"
        style={{ height: "30px", marginRight: "20px" }}
      />

      {/* Menu Links */}
      <Menu
        mode="horizontal"
        theme="light"
        style={{
          flex: 1,
          borderBottom: "none",
          lineHeight: "64px",
          marginBottom: "0",
        }}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="articles">
          <Link to="/articles">Articles</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
      </Menu>

      {/* Search Box */}
      <Input
        placeholder="Search articles"
        prefix={<SearchOutlined />}
        style={{ width: 300, marginRight: "20px" }}
      />

      {/* Language Selector */}
      <Select
        defaultValue="EN"
        style={{ width: 100, marginRight: "20px" }}
        suffixIcon={<GlobalOutlined />}
      >
        <Option value="EN">EN</Option>
        <Option value="FR">FR</Option>
        <Option value="ES">ES</Option>
        {/* Add more language options as needed */}
      </Select>

      {/* Auth Links */}
      {user ? (
        <Button type="link" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <>
          <Button type="link">
            <Link to="/login">Login</Link>
          </Button>
          <Button type="link">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default Navbar;
