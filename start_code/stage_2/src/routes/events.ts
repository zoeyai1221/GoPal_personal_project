import { Request, Response, Router } from 'express';
import { Event, AuthenticatedRequest } from '../types';
import { authMiddleware } from '../middlewares/auth';
import databaseManagerInstance from '../db/databaseManager';

const router: Router = Router();
const eventDb = databaseManagerInstance.getEventDb();
const userDb = databaseManagerInstance.getUserDb();

// Initialize the database when the module loads
eventDb.initialize().catch(err => {
  console.error('Failed to initialize event database:', err);
  process.exit(1);
})

// Event list route - displays all dining events (no auth required to view)
router.get('/dining', (req: Request, res: Response) => {
  const events = eventDb.getAll();

  const eventsWithHostName = events.map(event => {
    const hostUser = userDb.getById(event.host);
    return {
      ...event,
      hostName: hostUser ? hostUser.name : 'Unknown'
    };
  });

  res.render('events/list', {
    title: 'Dining Events',
    events: eventsWithHostName,
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

  const event = eventDb.getById(eventId);
  if (!event) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }

  // prompt message
  let message: string = '';

  if (event.attendees.includes(userId)) {
      message = 'You already joined this event!';
  } else {
    event.attendees.push(userId);
    await eventDb.save();
    message = 'You have successfully joined! Enjoy the meal with your buddy!';
  }

  const events = eventDb.getAll();
  const eventsWithHostName = events.map(event => {
    const hostUser = userDb.getById(event.host);
    return {
      ...event,
      hostName: hostUser ? hostUser.name : 'Unknown'
    };
  });

  // render the page with prompt
  res.render('events/list', {
    title: 'Dining Events',
    events: eventsWithHostName,
    user: req.session.user,
    message,
  });
});

// Get details for a specific event
router.get('/:id', authMiddleware, (req: Request, res: Response) => {
  const eventId: string = req.params.id;
  const event = eventDb.getById(eventId);

  if (!event) {
    res.status(404).json({
      error: 'Event not found',
      eventId,
    });
    return;
  }

  const hostUser = userDb.getById(event.host);
  const hostName = hostUser ? hostUser.name : 'Unknown';

  const eventsWithHostName = {
    ...event,
    hostName,
  }

  res.render('events/detail', {
    title: 'Dining Events',
    event: eventsWithHostName,
    user: req.session.user
  })
});

export default router;
