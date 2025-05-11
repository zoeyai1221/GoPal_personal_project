import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { User, AuthRequest } from '../types';

const router = Router();

// Mock user data
const users: User[] = [
  {
    id: 1,
    name: 'Demo User',
    email: 'user@example.com'
  }
];

/**
 * @route GET /api/users/profile
 * @desc Get current user profile
 * @access Private
 */
router.get('/profile', authMiddleware, (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    
    // In a real app, fetch user from database
    // Here we just return the user from the JWT token
    if (!authReq.user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: authReq.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route PUT /api/users/profile
 * @desc Update user profile
 * @access Private
 * 
 * TODO: Implement actual profile update
 */
router.put('/profile', authMiddleware, (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const { name, email } = req.body;
    
    if (!authReq.user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user data (mock implementation)
    const updatedUser: User = {
      ...authReq.user,
      name: name || authReq.user.name,
      email: email || authReq.user.email
    };
    
    // In a real app, save to database
    
    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Private
 */
router.get('/:id', authMiddleware, (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Find user
    const user = users.find(user => user.id === id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Don't send password
    const { password, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
