import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const onFinish = async (values: { name: string; email: string; password: string; confirm: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      const { name, email, password } = values;
      const success = await register(name, email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Registration failed. Email might already be in use.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="form-container">
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Register for GoPal
        </Title>
        
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '16px' }}
          />
        )}
        
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter your name'
              }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Full Name" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email'
              },
              {
                type: 'email',
                message: 'Please enter a valid email address'
              }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password'
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters'
              }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                }
              })
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Confirm Password" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              className="full-width"
              size="large"
            >
              Register
            </Button>
          </Form.Item>
          
          <div style={{ textAlign: 'center' }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
