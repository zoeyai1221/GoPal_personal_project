import { Request, Response, Router } from 'express';
import { AuthenticatedRequest } from '../types';
import { authMiddleware } from '../middlewares/auth';
import databaseManagerInstance from '../db/databaseManager';

const router: Router = Router();
const userDb = databaseManagerInstance.getUserDb();

// User profile route
router.get('/profile', authMiddleware, (req: Request, res: Response) => {
  // In a real implementation, we would fetch user details from a database
  // For the starter code, we'll use the session data

  const user = req.session.user;

  res.render('users/profile', { 
    title: 'Your Profile', 
    // user: req.session.user 
    user,
  });
});

// Update user profile (POST handler)
router.post('/profile', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.session.user!.id;
  const { name } = req.body;

  // Handle if no changes happened
  if (name === userDb.getById(userId)?.name) {
    return res.render('users/profile', {
      title: 'Your Profile',
      user: req.session.user,
      error: 'No changes'
    })
  }
  // update in the session
  const updated = userDb.update(userId, { name: name.trim() });

  if (!updated) {
    return res.render('users/profile', {
      title: 'Your Profile',
      user: req.session.user,
      error: 'User not found',
    });
  }

  // save to disk
  await userDb.save();

  // sync up the session
  req.session.user = updated;

  return res.render('users/profile', {
    title: 'Your Profile',
    user: req.session.user,
    success: 'Profile updated successfully!'
  });

});

// Change password (POST handler)
router.post('/change-password', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.session.user!.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (currentPassword !== userDb.getById(userId)?.password) {
    return res.render('users/profile', {
      title: 'Your Profile',
      user: req.session.user,
      error: 'Current password is wrong'
    });
  }

  if (newPassword !== confirmPassword) {
    return res.render('users/profile', {
      title: 'Your Profile',
      user: req.session.user,
      error: 'New passwords do not match'
    });
  } 

  const updated = userDb.update(userId, { password: newPassword });
  await userDb.save();
  req.session.user = updated;

  return res.render('users/profile', {
    title: 'Your Profile',
    user: req.session.user,
    success: 'Password changed successfully!'
  });
});

// Delete user

export default router;
