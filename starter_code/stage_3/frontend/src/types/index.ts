export interface User {
  id: number;
  name: string;
  email: string;
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

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
