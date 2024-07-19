import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import "../assets/styles/ArticleList.css"; // Make sure to create and import this CSS file

const truncateContent = (content, wordLimit) => {
  const words = content.split(" ");
  if (words.length <= wordLimit) {
    return content;
  }
  return `${words.slice(0, wordLimit).join(" ")}...`;
};

const ArticlesList = ({ articles }) => {
  return (
    <Row gutter={16} className="articles-list">
      {articles.map((article) => (
        <Col
          key={article._id}
          xs={24}
          sm={12}
          md={8}
          lg={6}
          className="article-col"
        >
          <Card title={article.title} className="article-card">
            <p>{truncateContent(article.content, 26)}</p>
            <Link to={`/articles/${article._id}`}>Read more</Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ArticlesList;
