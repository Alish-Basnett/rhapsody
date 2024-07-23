import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
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
  Tooltip,
  Upload,
} from "antd";
import {
  LikeOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import useUser from "../hooks/useUser";

const { Title, Paragraph } = Typography;

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState(null);
  const [isLoadingArticle, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editableContent, setEditableContent] = useState("");
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { articleId } = useParams();

  const { user } = useUser();

  useEffect(() => {
    const fetchArticleInfo = async () => {
      try {
        const res = await axios.get(`/api/articles/${articleId}`);
        setArticleInfo(res.data);
        setEditableContent(res.data.content);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching article:", error);
        setIsLoading(false); // Set loading to false even if there is an error
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

  const handleOk = async () => {
    const formData = new FormData();
    formData.append("image", fileList[0]);

    try {
      const response = await axios.put(
        `/api/articles/${articleId}/imageUrl`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setArticleInfo(response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating article image:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpvote = async () => {
    try {
      if (user && user.idToken) {
        const response = await axios.put(
          `/api/articles/${articleId}/upvote`,
          {},
          { headers: { Authorization: `Bearer ${user.idToken}` } }
        );
        setArticleInfo(response.data);
      } else {
        console.error("User is not logged in or token is missing.");
      }
    } catch (error) {
      console.error("Error upvoting article:", error);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  if (isLoadingArticle) {
    return <Spinner />;
  }

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
              user ? (
                <Button
                  icon={<LikeOutlined />}
                  type="primary"
                  onClick={handleUpvote}
                >
                  {articleInfo.upvotes} Upvote(s)
                </Button>
              ) : (
                <Tooltip title="Login to upvote">
                  <Button icon={<LikeOutlined />} type="default" disabled>
                    {articleInfo.upvotes} Upvote(s)
                  </Button>
                </Tooltip>
              ),
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
              user ? (
                <Button
                  icon={<EditOutlined />}
                  type="default"
                  onClick={handleEditImageClick}
                >
                  Edit Image URL
                </Button>
              ) : (
                <Tooltip title="Login to edit image URL">
                  <Button icon={<EditOutlined />} type="default" disabled>
                    Edit Image URL
                  </Button>
                </Tooltip>
              ),
            ]}
          >
            <Title level={2}>{articleInfo.title}</Title>
            {!isEditingContent ? (
              <Paragraph>{articleInfo.content}</Paragraph>
            ) : (
              <Form layout="vertical">
                <Form.Item>
                  <Input.TextArea
                    rows={8}
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                  />
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <AddComment articleId={articleId} onAddComment={addComment} />
          <CommentsList comments={articleInfo.comments} />
        </Col>
      </Row>

      <Modal
        title="Edit Image URL"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleOk}>
          <Form.Item>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
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
