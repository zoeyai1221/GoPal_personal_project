import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

export interface Indexed {
  id: string;
}

export interface User extends Indexed {
  name: string;
  email: string;
  password?: string; // Marked as optional since we don't want to include it in responses
}

export enum EventType {
  Dining = 'dining',
  Trip = 'trip',
}

export interface BaseEvent extends Indexed {
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
  host: string;
  // attendees: number;
  attendees: string[]; // Array of attendee IDs
  maxAttendees?: number;
  // restaurant: string; // Add name manually first for simplicity
  type: EventType;
}

export interface DiningEvent extends BaseEvent {
  type: EventType.Dining;
  restaurant: string;
}

export interface TripEvent extends BaseEvent{
  type: EventType.Trip;
  endDate: string;
  destination: string;
}

export type Event = DiningEvent | TripEvent;

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
