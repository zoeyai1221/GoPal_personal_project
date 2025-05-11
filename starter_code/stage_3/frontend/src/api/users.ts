import api from './index';
import { User, ApiResponse } from '../types';

/**
 * API class for user related API calls
 */
export const UsersAPI = {
  /**
   * Get the current user's profile
   * 
   * @returns Promise with user profile response
   */
  getProfile: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch profile'
      };
    }
  },

  /**
   * Update the current user's profile
   * 
   * @param userData - Updated user data
   * @returns Promise with updated user response
   */
  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile'
      };
    }
  },

  /**
   * Get a user by ID
   * 
   * @param id - User ID
   * @returns Promise with user response
   */
  getUser: async (id: number): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch user'
      };
    }
  }
};
