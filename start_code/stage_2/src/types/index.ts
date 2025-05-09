import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

export interface User {
  id: string; // Ensure id is always a string, not undefined
  name: string;
  email: string;
  password?: string; // Marked as optional since we don't want to include it in responses
}

export interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
  host: string;
  // attendees: number;
  attendees: string[]; // Array of attendee IDs
  maxAttendees?: number;
  restaurant: string; // Add name manually first for simplicity
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  cuisine: string;
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
