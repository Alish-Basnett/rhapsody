import React, { useState, useEffect, useRef } from "react";
import { Typography, Divider, Carousel, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/HomePage.css"; // For custom styles

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

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

  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  return (
    <div className="homepage-container">
      <Divider />
      <div className="carousel-featured-container">
        <div className="carousel-section">
          <Carousel
            autoplay
            ref={carouselRef}
            beforeChange={handleBeforeChange}
            dots={false} // Hide default dots
            arrows={false} // Hide default arrows
          >
            {articles.map((article) => (
              <div
                key={article._id}
                className="carousel-item"
                onClick={() => handleArticleClick(article._id)}
              >
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
                  </div>
                  <div className="carousel-author-date">
                    <div className="carousel-author">{article.author}</div>
                    <div className="carousel-date">
                      {article.publicationDate} <span className="dot">•</span>{" "}
                      {article.minsRead}
                    </div>
                  </div>
                </div>
                {/* Information below the image for mobile view */}
                <div className="carousel-mobile-info">
                  <Title level={4}>{article.title}</Title>
                  <div className="carousel-author">{article.author}</div>
                  <div className="carousel-date">
                    {article.publicationDate} <span className="dot">•</span>{" "}
                    {article.minsRead}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
          {/* Dots Container */}
          <div className="carousel-dots-container">
            {articles.map((_, index) => (
              <div
                key={index}
                className={`carousel-dot ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => carouselRef.current.goTo(index)}
              />
            ))}
          </div>
        </div>

        <div className="featured-section">
          <Title level={3} className="featured-heading">
            Featured Articles
          </Title>
          {articles.map((article) => (
            <div
              key={article._id}
              className="featured-article"
              onClick={() => handleArticleClick(article._id)}
            >
              <div
                className="featured-article-image"
                style={{
                  backgroundImage: `url(${article.imageUrl})`,
                }}
              ></div>
              <div className="featured-article-content">
                <Title level={5}>{article.title}</Title>
                <Paragraph>{article.content.substring(0, 70)}...</Paragraph>
                <div className="featured-article-meta">
                  <div>{article.author}</div>
                  <div>
                    {article.publicationDate} <span className="dot">•</span>{" "}
                    {article.minsRead}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default HomePage;
