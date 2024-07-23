import React, { useState, useEffect, useRef } from "react";
import { Typography, Divider, Carousel, Spin, Button } from "antd";
import axios from "axios";
import "../assets/styles/HomePage.css"; // For custom styles

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

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

  const handleBeforeChange = (from, to) => {
    setCurrentSlide(to);
  };

  const goToPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const goToNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  return (
    <div className="homepage-container">
      <Divider />

      <Carousel
        autoplay
        ref={carouselRef}
        beforeChange={handleBeforeChange}
        dots={false} // Hide default dots
        arrows={false} // Hide default arrows
      >
        {articles.map((article) => (
          <div key={article._id} className="carousel-item">
            <div
              className="carousel-image"
              style={{
                backgroundImage: `url(${article.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
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

      {/* Custom Controls */}
      <div className="carousel-controls">
        <Button onClick={goToPrev}>&lt;</Button>
        <Button onClick={goToNext}>&gt;</Button>
      </div>

      <Divider />
    </div>
  );
};

export default HomePage;
