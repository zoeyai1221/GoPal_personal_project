import React, { useState, useEffect } from 'react';
import { Typography, Card, Form, Input, Button, message, Skeleton } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { UsersAPI } from '../api/users';
import { User } from '../types';

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const { authState } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();
  
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      if (!authState.user) {
        message.error('User information not found');
        return;
      }
      
      const response = await UsersAPI.getProfile();
      
      if (response.success && response.data) {
        const userData = response.data;
        
        // Set form values
        form.setFieldsValue({
          name: userData.name,
          email: userData.email
        });
      } else {
        message.error('Failed to fetch profile information');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      message.error('An error occurred while fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values: { name: string; email: string }) => {
    try {
      setSubmitting(true);
      
      const response = await UsersAPI.updateProfile(values);
      
      if (response.success && response.data) {
        message.success('Profile updated successfully');
      } else {
        message.error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('An error occurred while updating profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          My Profile
        </Title>
        
        <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateProfile}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Full Name" 
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Email" 
                size="large"
              />
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={submitting}
                className="full-width"
                size="large"
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Skeleton>
      </Card>
    </div>
  );
};

export default ProfilePage;
