import React from "react";
import { Typography, Row, Col, Card, Divider } from "antd";

const { Title, Paragraph } = Typography;

const featuredArticles = [
  {
    title: "The Future of Technology",
    description:
      "An in-depth look at the technological advancements shaping our future.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Health and Wellness Tips",
    description: "Practical advice for maintaining a healthy lifestyle.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Travel Guide: Top Destinations",
    description: "Explore the most beautiful places around the world.",
    image: "https://via.placeholder.com/300x200",
  },
];

const HomePage = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        Welcome to Rhapsody
      </Title>
      <Paragraph style={{ textAlign: "center", marginBottom: "40px" }}>
        Discover insightful articles on a variety of topics. We aim to inform,
        inspire, and engage our readers with high-quality content.
      </Paragraph>

      <Divider />

      <Title level={2} style={{ textAlign: "center" }}>
        Featured Articles
      </Title>
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "40px" }}>
        {featuredArticles.map((article) => (
          <Col key={article.title} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={<img alt={article.title} src={article.image} />}
              style={{ textAlign: "center" }}
            >
              <Card.Meta
                title={article.title}
                description={article.description}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      <Title level={2} style={{ textAlign: "center" }}>
        About Us
      </Title>
      <Paragraph style={{ textAlign: "center", marginBottom: "40px" }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
        temporibus ipsam commodi soluta, minima sed, eius voluptate placeat,
        voluptatibus sunt odio quisquam iure atque repudiandae. Distinctio quos
        quisquam pariatur itaque!
      </Paragraph>
      <Paragraph style={{ textAlign: "center", marginBottom: "40px" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
        provident unde tempore, tenetur, veniam quaerat eius repellendus
        assumenda impedit consequatur ullam recusandae, enim praesentium
        suscipit minus veritatis odit quisquam commodi. Odit illo doloremque
        veniam a qui, fugit minus, ex in, quibusdam rem dolore. Quasi, eligendi?
      </Paragraph>
      <Paragraph style={{ textAlign: "center", marginBottom: "40px" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At, eveniet?
        Molestiae magnam nulla animi dolore maiores obcaecati atque in, sunt
        laboriosam consequatur vero hic, suscipit fuga, id minima error quis
        explicabo assumenda qui. Vel aliquam eligendi ducimus et, quo deserunt.
        Consequatur earum quidem iusto rerum libero delectus, culpa velit sunt.
      </Paragraph>
      <Paragraph style={{ textAlign: "center", marginBottom: "40px" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime earum
        est autem iure odio, eum doloremque id recusandae cum perspiciatis.
      </Paragraph>
    </div>
  );
};

export default HomePage;
