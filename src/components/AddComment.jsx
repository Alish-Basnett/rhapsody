import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import axios from "axios";

const { TextArea } = Input;

const AddComment = ({ articleId, onAddComment }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        `/api/articles/${articleId}/comment`,
        values
      );
      onAddComment({ postedBy: values.postedBy, text: values.text });
      form.resetFields();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card title="Add a Comment">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="postedBy"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>
        <Form.Item
          name="text"
          label="Comment"
          rules={[{ required: true, message: "Please enter your comment" }]}
        >
          <TextArea rows={4} placeholder="Your comment" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddComment;
