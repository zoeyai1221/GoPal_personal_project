import api from './index';
import { LoginCredentials, RegisterCredentials, ApiResponse, LoginResponse } from '../types';

/**
 * API class for authentication related API calls
 */
export const AuthAPI = {
  /**
   * Login with email and password
   * 
   * @param credentials - Login credentials
   * @returns Promise with login response
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  /**
   * Register a new user
   * 
   * @param userData - User registration data
   * @returns Promise with registration response
   */
  register: async (userData: RegisterCredentials): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  /**
   * Logout the current user
   * 
   * @returns Promise with logout response
   */
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      const response = await api.post('/auth/logout');
      localStorage.removeItem('token');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Logout failed'
      };
    }
  }
};
