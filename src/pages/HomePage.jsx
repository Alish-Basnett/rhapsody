import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Card, Divider, Carousel, Spin } from "antd";
import axios from "axios";
import "../assets/styles/HomePage.css"; // For custom styles

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`/api/articles?limit=3`);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  return (
    <div className="homepage-container">
      <Divider />

      <Carousel autoplay>
        {articles.map((article) => (
          <div key={article._id} className="carousel-item">
            <div
              className="carousel-image"
              style={{
                backgroundImage: `url(${article.imageUrl})`,
              }}
            >
              <div className="carousel-content">
                <Title level={3} style={{ color: "white" }}>
                  {article.title}
                </Title>
                <Paragraph style={{ color: "white" }}>
                  {article.content.substring(0, 100)}...
                </Paragraph>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <Divider />
    </div>
  );
};

export default HomePage;
