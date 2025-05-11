import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, User } from '../types';

// Secret key should be in .env file in a real application
const JWT_SECRET = 'your-secret-key';

/**
 * Authentication middleware to verify JWT tokens
 * 
 * TODO: Implement proper authentication logic
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    // TODO: Replace with actual implementation
    // This is a stub implementation for the starter code
    const decoded = jwt.verify(token, JWT_SECRET) as { user: User };
    
    // Add user info to request object
    (req as AuthRequest).user = decoded.user;
    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
