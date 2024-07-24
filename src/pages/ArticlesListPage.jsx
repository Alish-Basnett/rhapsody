import React, { useState, useEffect } from "react";
import { Typography, Input, Row, Col, Card, Tag } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../assets/styles/ArticleListPage.css";

const { Title } = Typography;
const { Search } = Input;

const categories = ["all", "tech", "health", "sports", "finance"];

const ArticlesListPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("/api/articles");
        setArticles(res.data);
        filterArticles(searchTerm, filter, res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterArticles(value, filter, articles);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    filterArticles(searchTerm, value, articles);
  };

  const filterArticles = (searchTerm, filter, articles) => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter !== "all") {
      filtered = filtered.filter((article) => article.category === filter);
    }

    setFilteredArticles(filtered);
  };

  return (
    <div className="articles-page-container">
      <Row justify="center" className="search-filter-row">
        <Col xs={24} sm={16} md={12}>
          <Search
            placeholder="Search articles"
            enterButton
            onSearch={handleSearch}
            className="search-bar"
          />
        </Col>
      </Row>
      <div className="categories-menu">
        {categories.map((category) => (
          <Tag
            key={category}
            className={`category-tag ${filter === category ? "active" : ""}`}
            onClick={() => handleFilterChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Tag>
        ))}
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Row gutter={[16, 16]} className="articles-list">
          {filteredArticles.map((article) => (
            <Col
              key={article._id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="article-col"
            >
              <Card
                hoverable
                cover={<img alt={article.title} src={article.imageUrl} />}
                className="article-card"
              >
                <Card.Meta
                  title={article.title}
                  description={article.content.substring(0, 100) + "..."}
                />
                <div className="article-meta">
                  <span>{article.author}</span>
                  <span>{article.publicationDate}</span>
                  <span>{article.minsRead} mins read</span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ArticlesListPage;
