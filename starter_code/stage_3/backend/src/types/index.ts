import { Request } from 'express';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Marked as optional since we don't want to include it in responses
}

export interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
  host: string;
  attendees: number;
  maxAttendees?: number;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
