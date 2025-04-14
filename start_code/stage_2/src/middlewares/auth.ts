import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';

// Authentication middleware to check if user is logged in
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;
  
  if (authReq.session && authReq.session.user) {
    // User is logged in
    next();
  } else {
    // User is not logged in, redirect to login page
    res.redirect('/login');
  }
};
