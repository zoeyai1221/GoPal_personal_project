import { Request, Response, Router } from 'express';
import { User } from '../types';

const router: Router = Router();

// Login page - GET
router.get('/login', (req: Request, res: Response) => {
  // If user is already logged in, redirect to events page
  if (req.session.user) {
    return res.redirect('/events/dining');
  }
  
  res.render('auth/login', { 
    title: 'Login',
    error: req.query.error
  });
});

// Login form submission - POST
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  // In a real implementation, this would validate credentials against a database
  // For the starter code, we'll return a 404 error as specified in requirements
  res.status(404).json({ 
    error: 'API not implemented',
    message: 'This is a starter code. The backend API for user authentication is not implemented.'
  });
});

// Register page - GET
router.get('/register', (req: Request, res: Response) => {
  // If user is already logged in, redirect to events page
  if (req.session.user) {
    return res.redirect('/events/dining');
  }
  
  res.render('auth/register', { 
    title: 'Register',
    error: req.query.error
  });
});

// Register form submission - POST
router.post('/register', (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;
  
  // In a real implementation, this would create a new user in the database
  // For the starter code, we'll return a 404 error as specified in requirements
  res.status(404).json({ 
    error: 'API not implemented',
    message: 'This is a starter code. The backend API for user registration is not implemented.'
  });
});

// Logout - GET
router.get('/logout', (req: Request, res: Response) => {
  // In a real implementation, this would destroy the session
  // For the starter code, we'll just redirect to the login page
  req.session.destroy((err: Error | null) => {
    res.redirect('/login');
  });
});

export default router;
