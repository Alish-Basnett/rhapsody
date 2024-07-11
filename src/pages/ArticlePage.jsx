import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Divider, Row, Col, Card } from "antd";
import NotFoundPage from "./NotFoundPage";
import articles from "./ArticleContent";

const { Title, Paragraph, Text } = Typography;

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  if (!article) {
    return <NotFoundPage />;
  }

  const relatedArticles = articles
    .filter((a) => a.name !== articleId)
    .slice(0, 3);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <img
        src={article.image || "https://via.placeholder.com/900x300"}
        alt={article.title}
        style={{ width: "100%", marginBottom: "20px" }}
      />
      <Title level={1} style={{ textAlign: "center" }}>
        {article.title}
      </Title>
      <Text
        type="secondary"
        style={{ display: "block", textAlign: "center", marginBottom: "20px" }}
      >
        By {article.author || "Unknown Author"} | Published on{" "}
        {article.date || "Unknown Date"}
      </Text>
      <Divider />
      {article.content.map((paragraph, i) => (
        <Paragraph key={i}>{paragraph}</Paragraph>
      ))}
      <Divider />
      <Title level={2}>Related Articles</Title>
      <Row gutter={[16, 16]}>
        {relatedArticles.map((related) => (
          <Col key={related.name} xs={24} sm={12}>
            <Card
              hoverable
              cover={
                <img
                  alt={related.title}
                  src={related.image || "https://via.placeholder.com/300x200"}
                />
              }
            >
              <Card.Meta
                title={related.title}
                description={`${related.content[0].substring(0, 100)}...`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ArticlePage;
