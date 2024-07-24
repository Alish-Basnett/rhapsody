import React, { useState } from "react";
import { Menu, Input, Select, Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from "../hooks/useUser";
import {
  GlobalOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import rhapsodyLogo from "../assets/images/rhapsody-main-logo.png";
import "../assets/styles/Navbar.css"; // Ensure to import the CSS file

const { Option } = Select;

const Navbar = () => {
  const { user, setUser } = useUser();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useState(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setUser(null); // Update the user state to null
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const mobileMenu = (
    <Menu>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="articles">
        <Link to="/articles">Articles</Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to="/about">About</Link>
      </Menu.Item>
      {user ? (
        <Menu.Item key="logout" onClick={handleLogout}>
          Logout
        </Menu.Item>
      ) : (
        <>
          <Menu.Item key="login">
            <Link to="/auth">Login</Link>
          </Menu.Item>
          <Menu.Item key="signup">
            <Link to="/auth">Sign Up</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div className="navbar-container">
      {/* Logo */}
      <Link to="/">
        <img src={rhapsodyLogo} alt="Rhapsody Logo" className="navbar-logo" />
      </Link>

      {/* Menu Links */}
      {!isMobile && (
        <>
          <Menu
            mode="horizontal"
            theme="light"
            className="navbar-menu"
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
            className="navbar-search"
          />

          {/* Language Selector */}
          <Select
            defaultValue="EN"
            className="navbar-language"
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
                <Link to="/auth">Login</Link>
              </Button>
              <Button type="link">
                <Link to="/auth">Sign Up</Link>
              </Button>
            </>
          )}
        </>
      )}

      {isMobile && (
        <Dropdown overlay={mobileMenu} trigger={["click"]}>
          <Button
            icon={<MenuOutlined />}
            className="navbar-mobile-menu-button"
          />
        </Dropdown>
      )}
    </div>
  );
};

export default Navbar;
