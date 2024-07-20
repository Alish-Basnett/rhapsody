import React from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from "../hooks/useUser";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setUser(null); // Update the user state to null
      navigate("/auth"); // Redirect to the home page or login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Menu mode="horizontal" theme="dark">
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
          Log Out
        </Menu.Item>
      ) : (
        <Menu.Item key="login">
          <Link to="/auth">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navbar;
