import { Request, Response, Router } from 'express';
import { Event, AuthenticatedRequest } from '../types';
import { authMiddleware } from '../middlewares/auth';
import databaseManagerInstance from "../db/databaseManager";

const router: Router = Router();
const eventDb = databaseManagerInstance.getEventDb();

// Initialize the database when the module loads
eventDb.initialize().catch(err => {
  console.error('Failed to initialize event database:', err);
  process.exit(1);
})

// Event list route - displays all dining events (no auth required to view)
// router.get('/dining', (req: Request, res: Response) => {
//   // In a complete implementation, this would fetch events from a database
//   // For the starter code, we'll use hardcoded sample data
//   const events: Event[] = [
//     {
//       id: "1",
//       name: 'Italian Dinner Night',
//       location: 'Luigi\'s Restaurant',
//       date: '2025-04-20',
//       time: '19:00',
//       description: 'Join us for a lovely Italian dinner!',
//       host: 'John Doe',
//       attendees: ["id"],
//       restaurant: 'Luigi\'s Restaurant',
//       maxAttendees: 10
//     }
//   ];
  
//   res.render('events/list', { 
//     title: 'Dining Events', 
//     events, 
//     user: req.session.user 
//   });
// });
router.get('/dining', (req: Request, res: Response) => {
  const events = eventDb.getAll();
  res.render('events/list', {
    title: 'Dining Events',
    events,
    user: req.session.user
  });
})


// Get form for creating a new event
router.get('/create', authMiddleware, (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('events/create', { 
    title: 'Create New Event', 
    user: req.session.user 
  });
});

// Create new event (POST handler)
router.post('/create', authMiddleware, async (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(401).json({ error: 'Not authenticated'});
    return;
  }
  // In a real implementation, this would save to a database
  // For the starter code, we'll return a 404 error as specified in requirements
  // res.status(404).json({ 
  //   error: 'API not implemented',
  //   message: 'This is a starter code. The backend API for creating events is not implemented.' 
  // });

  const { name, date, time, description, location, restaurant } = req.body;

  const newEvent: Omit<Event, 'id'> = {
    name,
    date,
    time,
    description,
    location,
    restaurant,
    host: req.session.user.id,
    attendees: [req.session.user.id] // Host automatically joins
  }

  const event = eventDb.create(newEvent);
  await eventDb.save();

  res.redirect('/');
});

// Join an event
router.post('/join/:id', authMiddleware, async (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(401).json({ error: 'Not authenticated'});
    return;
  }

  const eventId: string = req.params.id; // param - :xxx (:id)
  const userId = req.session.user.id;
  
  // In a real implementation, this would update the database
  // For the starter code, we'll return a 404 error as specified in requirements
  // res.status(404).json({ 
  //   error: 'API not implemented',
  //   message: 'This is a starter code. The backend API for joining events is not implemented.',
  //   eventId
  // });
  const event = eventDb.getById(eventId);
  if (!event) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }

  if (!event.attendees.includes(userId)) {
    event.attendees.push(userId);
    await eventDb.save();
  }

  res.redirect('/');
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
