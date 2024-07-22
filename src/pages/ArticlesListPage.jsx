import React, { useState, useEffect } from "react";
import { Typography, Input, Select, Row, Col } from "antd";
import axios from "axios";
import ArticlesList from "../components/ArticlesList";
import Spinner from "../components/Spinner";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const ArticlesListPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("/.netlify/functions/getArticles");
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
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={1} style={{ textAlign: "center", marginBottom: "40px" }}>
        Articles
      </Title>
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={16} md={12}>
          <Search
            placeholder="Search articles"
            enterButton
            onSearch={handleSearch}
          />
        </Col>
        <Col xs={24} sm={8} md={6} style={{ textAlign: "right" }}>
          <Select
            value={filter}
            onChange={handleFilterChange}
            style={{ width: "100%" }}
          >
            <Option value="all">All Categories</Option>
            <Option value="tech">Tech</Option>
            <Option value="health">Health</Option>
            <Option value="sports">Sports</Option>
            <Option value="finance">Finance</Option>
          </Select>
        </Col>
      </Row>
      {isLoading ? <Spinner /> : <ArticlesList articles={filteredArticles} />}
    </div>
  );
};

export default ArticlesListPage;
