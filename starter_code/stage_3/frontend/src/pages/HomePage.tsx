import React from 'react';
import { Typography, Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const { authState } = useAuth();
  
  return (
    <div className="app-container">
      <Row gutter={[24, 24]} justify="center">
        <Col span={24}>
          <Title level={2}>Welcome to GoPal</Title>
          {authState.user && (
            <Paragraph>
              Hello, <strong>{authState.user.name}</strong>! Ready to plan some dining events?
            </Paragraph>
          )}
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Card 
            title={<><CalendarOutlined /> Upcoming Events</>}
            hoverable
          >
            <Paragraph>
              Discover dining events or create your own!
            </Paragraph>
            <Link to="/events">
              <Button type="primary">View Events</Button>
            </Link>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Card 
            title={<><UserOutlined /> My Profile</>}
            hoverable
          >
            <Paragraph>
              Update your profile information and preferences.
            </Paragraph>
            <Link to="/profile">
              <Button type="default">View Profile</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
