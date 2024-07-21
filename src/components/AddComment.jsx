import React, { useState } from "react";
import { Form, Input, Button, Card, notification, Tooltip } from "antd";
import axios from "axios";
import useUser from "../hooks/useUser"; // Import your custom hook

const { TextArea } = Input;

const AddComment = ({ articleId, onAddComment }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useUser(); // Get the user data including the token

  const onFinish = async (values) => {
    if (!user || !user.idToken) {
      notification.warning({
        message: "Login Required",
        description: "Please log in to add a comment.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `/api/articles/${articleId}/comment`,
        {
          ...values,
          postedBy: user.email, // Automatically set the postedBy field to the user's email
        },
        {
          headers: {
            Authorization: `Bearer ${user.idToken}`, // Send the token in the headers
          },
        }
      );
      onAddComment({
        uid: user.uid,
        postedBy: user.email, // Include the user's email in the comment
        text: values.text,
      }); // Include the uid in the comment
      form.resetFields();
    } catch (error) {
      console.error("Error adding comment:", error);
      notification.error({
        message: "Error",
        description: error.response?.data || "Error adding comment",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card title="Add a Comment">
      {!user ? (
        <Tooltip title="Login to comment">
          <Button type="default" disabled>
            Add Comment
          </Button>
        </Tooltip>
      ) : (
        <Form form={form} onFinish={onFinish} layout="vertical">
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
      )}
    </Card>
  );
};

export default AddComment;
