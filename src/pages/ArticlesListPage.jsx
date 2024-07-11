import React, { useState } from "react";
import { Typography, Input, Select, Row, Col, Card } from "antd";
import ArticlesList from "../components/ArticlesList";
import articles from "./ArticleContent";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const ArticlesListPage = () => {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterArticles(value, filter);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    filterArticles(searchTerm, value);
  };

  const filterArticles = (searchTerm, filter) => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.some((content) =>
            content.toLowerCase().includes(searchTerm.toLowerCase())
          )
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
            placeholder="Search articles..."
            enterButton
            onSearch={handleSearch}
            style={{ marginBottom: "20px" }}
          />
        </Col>
        <Col xs={24} sm={8} md={6}>
          <Select
            defaultValue="all"
            style={{ width: "100%" }}
            onChange={handleFilterChange}
          >
            <Option value="all">All</Option>
            <Option value="technology">Technology</Option>
            <Option value="health">Health</Option>
            <Option value="travel">Travel</Option>
          </Select>
        </Col>
      </Row>
      <ArticlesList articles={filteredArticles} />
    </div>
  );
};

export default ArticlesListPage;
