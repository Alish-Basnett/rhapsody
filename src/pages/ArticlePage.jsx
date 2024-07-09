import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Divider } from "antd";
import articles from "./ArticleContent";

const { Title, Paragraph } = Typography;

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        {article.title}
      </Title>
      <Divider />
      {article.content.map((paragraph, i) => (
        <Paragraph key={i}>{paragraph}</Paragraph>
      ))}
    </div>
  );
};

export default ArticlePage;
