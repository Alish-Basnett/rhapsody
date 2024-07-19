import React from "react";
import { List, Card } from "antd";

const CommentsList = ({ comments }) => (
  <List
    header={`${comments.length} ${
      comments.length > 1 ? "comments" : "comment"
    }`}
    itemLayout="vertical"
    dataSource={comments}
    renderItem={(comment) => (
      <List.Item>
        <Card>
          <Card.Meta title={comment.postedBy} description={comment.text} />
        </Card>
      </List.Item>
    )}
  />
);

export default CommentsList;
