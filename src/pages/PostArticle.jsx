import React from "react";
import { Form, Input, Button, Card } from "antd";
import "../assets/styles/PostArticle.css";

const { TextArea } = Input;

const PostArticle = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Handle form submission, e.g., send to backend
  };

  return (
    <div className="post-article-container">
      <Card
        title="Post a New Article"
        bordered={false}
        className="post-article-card"
      >
        <Form
          form={form}
          name="post_article"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input
              placeholder="Enter article title"
              className="post-article-title-input"
            />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please input the content!" }]}
          >
            <TextArea
              rows={12}
              placeholder="Enter article content"
              className="post-article-content-input"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PostArticle;
