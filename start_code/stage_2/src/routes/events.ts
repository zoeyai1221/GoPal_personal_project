import { Request, Response, Router } from 'express';
import { Event, AuthenticatedRequest } from '../types';
import { authMiddleware } from '../middlewares/auth';

const router: Router = Router();

// Event list route - displays all dining events (no auth required to view)
router.get('/dining', (req: Request, res: Response) => {
  // In a complete implementation, this would fetch events from a database
  // For the starter code, we'll use hardcoded sample data
  const events: Event[] = [
    {
      id: 1,
      name: 'Italian Dinner Night',
      location: 'Luigi\'s Restaurant',
      date: '2025-04-20',
      time: '19:00',
      description: 'Join us for a lovely Italian dinner!',
      host: 'John Doe',
      attendees: 3
    },
    {
      id: 2,
      name: 'Sushi Lunch',
      location: 'Sakura Sushi Bar',
      date: '2025-04-25',
      time: '12:30',
      description: 'Casual lunch meetup for sushi lovers',
      host: 'Jane Smith',
      attendees: 5
    },
    {
      id: 3,
      name: 'BBQ in the Park',
      location: 'Central Park',
      date: '2025-05-01',
      time: '17:00',
      description: 'Outdoor BBQ with games and activities',
      host: 'Mike Johnson',
      attendees: 10
    }
  ];
  
  res.render('events/list', { 
    title: 'Dining Events', 
    events, 
    user: req.session.user 
  });
});

// Get form for creating a new event
router.get('/create', authMiddleware, (req: Request, res: Response) => {
  res.render('events/create', { 
    title: 'Create New Event', 
    user: req.session.user 
  });
});

// Create new event (POST handler)
router.post('/create', authMiddleware, (req: Request, res: Response) => {
  // In a real implementation, this would save to a database
  // For the starter code, we'll return a 404 error as specified in requirements
  res.status(404).json({ 
    error: 'API not implemented',
    message: 'This is a starter code. The backend API for creating events is not implemented.' 
  });
});

// Join an event
router.post('/join/:id', authMiddleware, (req: Request, res: Response) => {
  const eventId: string = req.params.id;
  
  // In a real implementation, this would update the database
  // For the starter code, we'll return a 404 error as specified in requirements
  res.status(404).json({ 
    error: 'API not implemented',
    message: 'This is a starter code. The backend API for joining events is not implemented.',
    eventId
  });
});

// Get details for a specific event
router.get('/:id', authMiddleware, (req: Request, res: Response) => {
  const eventId: string = req.params.id;
  
  // In a real implementation, this would fetch from the database
  // For the starter code, we'll return a 404 error as specified in requirements
  res.status(404).json({ 
    error: 'API not implemented',
    message: 'This is a starter code. The backend API for retrieving event details is not implemented.',
    eventId
  });
});

export default router;
