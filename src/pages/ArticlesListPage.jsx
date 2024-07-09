import React from "react";
import ArticlesList from "../components/ArticlesList";
import { Typography } from "antd";
import articles from "./ArticleContent";

const { Title } = Typography;

const ArticlesListPage = () => {
  return (
    <>
      <Title level={1} style={{ textAlign: "center", marginBottom: "40px" }}>
        Articles
      </Title>
      <ArticlesList articles={articles} />
    </>
  );
};

export default ArticlesListPage;
