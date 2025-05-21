import { Request, Response, Router } from 'express';
import { User } from '../types';
// import { UserDatabase } from '../db/userDatabase';
import databaseManagerInstance from '../db/databaseManager';

const router: Router = Router();
// const userDb = new UserDatabase();
const userDb = databaseManagerInstance.getUserDb();

// Initialize the database when the module loads
userDb.initialize().catch(err => {
  console.log("Fail to initialize user database:", err);
  process.exit(1);
})

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
  // res.status(404).json({ 
  //   error: 'API not implemented',
  //   message: 'This is a starter code. The backend API for user authentication is not implemented.'
  // });

  const user = userDb.findByEmail(email);
  // Handle if no such user
  if (!user) {
    return res.render('auth/login', {
      title: 'Login',
      error: 'User email does not exist'
    });
  }

  // Handle if password is wrong
  if (user.password !== password) {
    return res.render('auth/login', {
      title: 'Login',
      error: 'Invalid password'
    });
  }

  // Create session
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  // Return to home page after successfully logged in
  res.redirect('/');
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
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;
  
  // In a real implementation, this would create a new user in the database
  // For the starter code, we'll return a 404 error as specified in requirements
  // res.status(404).json({ 
  //   error: 'API not implemented',
  //   message: 'This is a starter code. The backend API for user registration is not implemented.'
  // });

  // Handle if password not matching
  if (password !== confirmPassword) {
    return res.render('auth/register', {
      title: 'Register',
      error: 'Passwords do not match',
      name, // backfill
      email // backfill
    });
  }

  // Handle if email already exists
  if (userDb.findByEmail(email)) {
    return res.render('auth/register', {
      title: 'Register',
      error: 'Email already in use', 
      name // backfill
    });
  }

  const user = userDb.create({ name, email, password });
  await userDb.save();

  // Create session
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  // Return to home page after successfully registered
  res.redirect('/');
});

// Logout - GET
router.get('/logout', (req: Request, res: Response) => {
  // In a real implementation, this would destroy the session
  // For the starter code, we'll just redirect to the login page
  req.session.destroy((err: Error | null) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

export default router;
