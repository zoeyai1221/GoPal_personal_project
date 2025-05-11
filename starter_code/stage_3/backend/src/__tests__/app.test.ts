import request from 'supertest';
import app from '../app';

// Basic sanity tests for the API server
describe('App', () => {
  // Test the root endpoint
  it('should return status 200 on root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  // Test non-existent route for 404 handling
  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
  });

  // Test the API info endpoint
  it('should return API information on the root API endpoint', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('endpoints');
  });

  // Example of a mocked test (for demonstration purposes)
  it('should demonstrate a mock test', () => {
    // Mock example
    const mockFn = jest.fn();
    mockFn('test');
    
    expect(mockFn).toHaveBeenCalledWith('test');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
