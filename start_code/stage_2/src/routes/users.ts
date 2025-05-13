import { Request, Response, Router } from 'express';
import { AuthenticatedRequest } from '../types';
import { authMiddleware } from '../middlewares/auth';
import databaseManagerInstance from '../db/databaseManager';

const router: Router = Router();
const userDb = databaseManagerInstance.getUserDb();
const eventDb = databaseManagerInstance.getEventDb();

// Helper: get user's created events
function getCreatedEvents(userId: string) {
  return eventDb.getAll().filter(e => e.host === userId);
}

// Helper: get user's joined events
function getJoinedEvents(userId: string) {
  return eventDb.getAll().filter(e => e.attendees.includes(userId));
}

// User profile route
router.get('/profile', authMiddleware, (req: Request, res: Response) => {
  // In a real implementation, we would fetch user details from a database
  // For the starter code, we'll use the session data

  const user = req.session.user!;

  // Get user's events
  const createdEvents = getCreatedEvents(user.id);
  const joinedEvents = getJoinedEvents(user.id);

  res.render('users/profile', { 
    title: 'Your Profile', 
    // user: req.session.user 
    user,
    stats: {
      createdCount: createdEvents.length,
      joinedCount: joinedEvents.length,
    }
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

// Add My Events Module
router.get('/events/created', authMiddleware, (req: Request, res: Response) => {
  const user = req.session.user!;
  const events = getCreatedEvents(user.id);

  res.render('events/list', {
    title: 'Events I Created',
    events,
    user,
  });
});

router.get('/events/joined', authMiddleware, (req: Request, res: Response) => {
  const user = req.session.user!;
  const events = getJoinedEvents(user.id);

  res.render('events/list', {
    title: 'Events I Joined',
    events,
    user,
  });
});

// Delete user

export default router;
