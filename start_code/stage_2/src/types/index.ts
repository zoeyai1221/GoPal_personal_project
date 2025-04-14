import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

export interface User {
  id?: number;
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

// Express session with user property
declare module 'express-session' {
  interface SessionData {
    user?: User;
  }
}

// Request with authenticated user
export interface AuthenticatedRequest extends Request {
  session: session.Session & Partial<session.SessionData>;
}

// Custom error with status
export interface CustomError extends Error {
  status?: number;
}
