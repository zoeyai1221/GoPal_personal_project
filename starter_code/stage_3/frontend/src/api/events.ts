import api from './index';
import { Event, ApiResponse } from '../types';

/**
 * API class for event related API calls
 */
export const EventsAPI = {
  /**
   * Get all events
   * 
   * @returns Promise with events response
   */
  getEvents: async (): Promise<ApiResponse<Event[]>> => {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch events'
      };
    }
  },

  /**
   * Get a single event by ID
   * 
   * @param id - Event ID
   * @returns Promise with event response
   */
  getEvent: async (id: number): Promise<ApiResponse<Event>> => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch event'
      };
    }
  },

  /**
   * Create a new event
   * 
   * @param eventData - Event data
   * @returns Promise with created event response
   */
  createEvent: async (eventData: Omit<Event, 'id' | 'host' | 'attendees'>): Promise<ApiResponse<Event>> => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create event'
      };
    }
  },

  /**
   * Update an existing event
   * 
   * @param id - Event ID
   * @param eventData - Updated event data
   * @returns Promise with updated event response
   */
  updateEvent: async (id: number, eventData: Partial<Event>): Promise<ApiResponse<Event>> => {
    try {
      const response = await api.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update event'
      };
    }
  },

  /**
   * Delete an event
   * 
   * @param id - Event ID
   * @returns Promise with delete response
   */
  deleteEvent: async (id: number): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete(`/events/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete event'
      };
    }
  },

  /**
   * Join an event
   * 
   * @param id - Event ID
   * @returns Promise with join response
   */
  joinEvent: async (id: number): Promise<ApiResponse<Event>> => {
    try {
      const response = await api.post(`/events/${id}/join`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to join event'
      };
    }
  }
};
