import React from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header, Content, Footer } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Menu items for navigation
  const menuItems = [
    { key: '/', label: 'Home', icon: <HomeOutlined /> },
    { key: '/events', label: 'Events', icon: <CalendarOutlined /> },
  ];

  // User dropdown menu items
  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile')
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ color: 'white', margin: 0, marginRight: '20px' }}>GoPal</h1>
          
          {authState.isAuthenticated && (
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems.map(item => ({
                key: item.key,
                label: <Link to={item.key}>{item.label}</Link>,
                icon: item.icon
              }))}
            />
          )}
        </div>
        
        <div>
          {authState.isAuthenticated ? (
            <Dropdown 
              menu={{ 
                items: userMenuItems 
              }} 
              placement="bottomRight"
              trigger={['click']}
            >
              <Avatar 
                style={{ backgroundColor: '#1890ff', cursor: 'pointer' }} 
                icon={<UserOutlined />}
              />
            </Dropdown>
          ) : (
            <div>
              <Button type="link" onClick={() => navigate('/login')}>Login</Button>
              <Button type="primary" onClick={() => navigate('/register')}>Register</Button>
            </div>
          )}
        </div>
      </Header>
      
      <Content style={{ padding: '0 50px', marginTop: 20 }}>
        {children}
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>
        GoPal Event Planning ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default PageLayout;
