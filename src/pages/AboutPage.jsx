import React from "react";
import { Typography, Row, Col, Card, Avatar, Divider } from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const teamMembers = [
  {
    name: "John Doe",
    position: "Founder & Editor-in-Chief",
    avatar: "https://via.placeholder.com/150",
    bio: "John is a seasoned writer and editor with a passion for sharing knowledge and insights.",
    social: {
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      email: "mailto:johndoe@example.com",
    },
  },
  // Add more team members here
];

const AboutPage = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        About Us
      </Title>
      <Paragraph style={{ textAlign: "center", marginBottom: "40px" }}>
        Welcome to Rhapsody, where we share insightful articles on a variety of
        topics. Our mission is to inform, inspire, and engage our readers with
        high-quality content.
      </Paragraph>

      <Divider />

      <Title level={2} style={{ textAlign: "center" }}>
        Our Mission
      </Title>
      <Paragraph style={{ textAlign: "center", marginBottom: "40px" }}>
        At Rhapsody, our mission is to create a platform where knowledge is
        shared freely and readers can explore diverse subjects. We strive to
        provide well-researched and thoughtfully written articles that add value
        to our readers' lives.
      </Paragraph>

      <Divider />

      <Title level={2} style={{ textAlign: "center" }}>
        Meet the Team
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {teamMembers.map((member) => (
          <Col key={member.name} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<Avatar src={member.avatar} size={150} />}
              style={{ textAlign: "center" }}
            >
              <Card.Meta title={member.name} description={member.position} />
              <Paragraph>{member.bio}</Paragraph>
              <div>
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubOutlined
                    style={{ fontSize: "24px", margin: "0 8px" }}
                  />
                </a>
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterOutlined
                    style={{ fontSize: "24px", margin: "0 8px" }}
                  />
                </a>
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinOutlined
                    style={{ fontSize: "24px", margin: "0 8px" }}
                  />
                </a>
                <a
                  href={member.social.email}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MailOutlined style={{ fontSize: "24px", margin: "0 8px" }} />
                </a>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      <Title level={2} style={{ textAlign: "center" }}>
        Contact Us
      </Title>
      <Paragraph style={{ textAlign: "center", marginBottom: "40px" }}>
        If you have any questions or would like to get in touch with us, feel
        free to send an email to <Text strong>contact@rhapsody.com</Text>.
      </Paragraph>
    </div>
  );
};

export default AboutPage;
