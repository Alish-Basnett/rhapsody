import React from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => {
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {articles.map((article) => (
          <Col key={article.name} xs={24} sm={12} md={8} lg={6}>
            <Link
              to={`/articles/${article.name}`}
              className="article-list-item"
            >
              <Card
                hoverable
                // cover={
                //   <img
                //     alt={article.title}
                //     src={`path-to-image/${article.name}.jpg`}
                //   />
                // }
              >
                <Card.Meta
                  title={article.title}
                  description={`${article.content[0].substring(0, 100)}...`}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ArticlesList;
