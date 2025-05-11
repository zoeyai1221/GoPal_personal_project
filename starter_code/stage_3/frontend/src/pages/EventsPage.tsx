import React, { useState, useEffect } from 'react';
import { Typography, Card, List, Button, Tag, Space, Modal, Form, Input, DatePicker, message, Empty } from 'antd';
import { PlusOutlined, EnvironmentOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Event } from '../types';
import { EventsAPI } from '../api/events';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await EventsAPI.getEvents();
      
      if (response.success && response.data) {
        setEvents(response.data);
      } else {
        message.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      message.error('An error occurred while fetching events');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (values: any) => {
    try {
      const eventData = {
        name: values.name,
        location: values.location,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        description: values.description,
        maxAttendees: values.maxAttendees ? parseInt(values.maxAttendees, 10) : undefined
      };
      
      const response = await EventsAPI.createEvent(eventData);
      
      if (response.success && response.data) {
        message.success('Event created successfully');
        setIsModalOpen(false);
        form.resetFields();
        fetchEvents(); // Refresh the events list
      } else {
        message.error(response.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      message.error('An error occurred while creating the event');
    }
  };

  const handleJoinEvent = async (event: Event) => {
    try {
      const response = await EventsAPI.joinEvent(event.id);
      
      if (response.success && response.data) {
        message.success('Successfully joined the event');
        fetchEvents(); // Refresh the events list
      } else {
        message.error(response.message || 'Failed to join event');
      }
    } catch (error) {
      console.error('Error joining event:', error);
      message.error('An error occurred while joining the event');
    }
  };

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Dining Events</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Event
        </Button>
      </div>
      
      {/* Events List */}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={events}
        loading={loading}
        locale={{ emptyText: <Empty description="No events found" /> }}
        renderItem={(event) => (
          <List.Item>
            <Card
              title={event.name}
              actions={[
                <Button key="join" type="primary" onClick={() => handleJoinEvent(event)}>
                  Join Event
                </Button>
              ]}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Paragraph>
                  <EnvironmentOutlined /> {event.location}
                </Paragraph>
                <Paragraph>
                  <ClockCircleOutlined /> {event.date} at {event.time}
                </Paragraph>
                <Paragraph>
                  <TeamOutlined /> {event.attendees} attendee{event.attendees !== 1 ? 's' : ''}
                  {event.maxAttendees && (
                    <span> / {event.maxAttendees} max</span>
                  )}
                </Paragraph>
                <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                  {event.description}
                </Paragraph>
                <Tag color="blue">Hosted by: {event.host}</Tag>
              </Space>
            </Card>
          </List.Item>
        )}
      />
      
      {/* Create Event Modal */}
      <Modal
        title="Create New Event"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateEvent}
        >
          <Form.Item
            name="name"
            label="Event Name"
            rules={[{ required: true, message: 'Please enter event name' }]}
          >
            <Input placeholder="Enter event name" />
          </Form.Item>
          
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter event location' }]}
          >
            <Input placeholder="Enter event location" />
          </Form.Item>
          
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select event date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: 'Please select event time' }]}
          >
            <DatePicker.TimePicker style={{ width: '100%' }} format="HH:mm" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter event description' }]}
          >
            <TextArea rows={4} placeholder="Enter event description" />
          </Form.Item>
          
          <Form.Item
            name="maxAttendees"
            label="Maximum Attendees"
            rules={[{ 
              pattern: /^\d+$/, 
              message: 'Please enter a valid number' 
            }]}
          >
            <Input placeholder="Leave blank for unlimited" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Create Event
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventsPage;
