import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import "../assets/styles/NotFoundPage.css";
import computer from "../assets/images/computer.svg";
import err404 from "../assets/images/err404.svg";
import home from "../assets/images/home.svg";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-image-container">
        <img src={computer} alt="Computer" className="not-found-computer" />
        <img src={err404} alt="404 Error" className="not-found-404" />
      </div>

      <div className="custom-result">
        <div className="error-container">
          <FaExclamationTriangle className="error-icon" />
          <div>
            <div className="error-subtitle">
              Sorry, the page you visited does not exist.
            </div>
          </div>
        </div>
        <Link to="/">
          <div className="home-button">
            <img src={home} alt="Home" className="home-icon" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
