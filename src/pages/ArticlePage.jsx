import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddComment from "../components/AddComment";
import {
  Card,
  Typography,
  Image,
  Button,
  Row,
  Col,
  Space,
  Modal,
  Form,
  Input,
} from "antd";
import {
  LikeOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editField, setEditField] = useState("");
  const [editableContent, setEditableContent] = useState("");
  const [isEditingContent, setIsEditingContent] = useState(false);
  const { articleId } = useParams();

  useEffect(() => {
    const fetchArticleInfo = async () => {
      try {
        const res = await axios.get(`/api/articles/${articleId}`);
        setArticleInfo(res.data);
        setEditableContent(res.data.content);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticleInfo();
  }, [articleId]);

  const addComment = (newComment) => {
    setArticleInfo((prevArticleInfo) => ({
      ...prevArticleInfo,
      comments: [...prevArticleInfo.comments, newComment],
    }));
  };

  const handleEditImageClick = () => {
    setEditField("imageUrl");
    setIsModalVisible(true);
  };

  const handleSaveContent = async () => {
    try {
      const response = await axios.put(`/api/articles/${articleId}/content`, {
        content: editableContent,
      });
      setArticleInfo(response.data);
      setIsEditingContent(false);
    } catch (error) {
      console.error("Error updating article content:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditableContent(articleInfo.content);
    setIsEditingContent(false);
  };

  const handleOk = async (values) => {
    try {
      const response = await axios.put(
        `/api/articles/${articleId}/imageUrl`,
        values
      );
      setArticleInfo(response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating article image URL:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (!articleInfo) {
    return <NotFoundPage />;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card
            cover={<Image alt={articleInfo.title} src={articleInfo.imageUrl} />}
            actions={[
              <Button icon={<LikeOutlined />} type="primary">
                {articleInfo.upvotes} Upvote(s)
              </Button>,
              !isEditingContent ? (
                <Button
                  icon={<EditOutlined />}
                  type="default"
                  onClick={() => setIsEditingContent(true)}
                >
                  Edit Content
                </Button>
              ) : (
                <Space>
                  <Button
                    icon={<SaveOutlined />}
                    type="primary"
                    onClick={handleSaveContent}
                  >
                    Save
                  </Button>
                  <Button
                    icon={<CloseOutlined />}
                    type="default"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </Space>
              ),
              <Button
                icon={<EditOutlined />}
                type="default"
                onClick={handleEditImageClick}
              >
                Edit Image URL
              </Button>,
            ]}
          >
            <Title>{articleInfo.title}</Title>
            {!isEditingContent ? (
              <Paragraph>{articleInfo.content}</Paragraph>
            ) : (
              <Input.TextArea
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                autoSize
              />
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <AddComment articleId={articleId} onAddComment={addComment} />
            <CommentsList comments={articleInfo.comments} />
          </Space>
        </Col>
      </Row>

      <Modal
        title="Edit Image URL"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleOk}>
          <Form.Item
            name="imageUrl"
            label="New Image URL"
            rules={[
              { required: true, message: "Please enter the new image URL" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ArticlePage;
