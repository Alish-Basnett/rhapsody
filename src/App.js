import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/BreadCrumbs";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Breadcrumbs />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
            <Route path="/articles" element={<ArticlesListPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
