import { Request, Response, Router } from 'express';
import { Event, AuthenticatedRequest, EventType, DiningEvent, TripEvent } from '../types';
import { authMiddleware } from '../middlewares/auth';
import databaseManagerInstance from '../db/databaseManager';
import { EventService } from '../services/eventService';

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
  const events = EventService.getByTypeWithHost(EventType.Dining);

  res.render('events/list', {
    title: 'Dining Events',
    eventType: 'dining',
    events,
    user: req.session.user
  });
})

router.get('/trip', (req: Request, res: Response) => {
  const events = EventService.getByTypeWithHost(EventType.Trip);

  res.render('events/list', {
    title: 'Trip Events',
    eventType: 'trip',
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

  const { type, name, date, time, description, location, restaurant, maxAttendees, endDate, destination } = req.body;

  let newEvent: Event;

  if (type === EventType.Dining) {
    const e: Omit<DiningEvent, 'id'> = {
      type,
      name,
      date,
      time,
      description,
      location,
      restaurant,
      maxAttendees: maxAttendees ? Number(maxAttendees) : undefined,
      host: req.session.user.id,
      attendees: [req.session.user.id] // Host automatically joins
    }
    newEvent = eventDb.create<DiningEvent>(e);
  } else if (type === EventType.Trip) {
    const e: Omit<TripEvent, 'id'> = {
      type,
      name,
      date,
      time,
      description,
      location,
      endDate,
      destination,
      maxAttendees: maxAttendees ? Number(maxAttendees) : undefined,
      host: req.session.user.id,
      attendees: [req.session.user.id] // Host automatically joins
    }
    newEvent = eventDb.create<TripEvent>(e);
  } else {
    res.status(400).json({ error: 'Invalid event type'});
    return;
  }

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
    message = 'You have successfully joined! Enjoy with your buddy!';
  }

  const events = EventService.getAllWithHostName();

  // render the page with prompt
  res.render('events/list', {
    title: 'Dining Events',
    events,
    user: req.session.user,
    message,
  });
});

// Get details for a specific event
router.get('/:id', authMiddleware, (req: Request, res: Response) => {
  const eventId: string = req.params.id;
  const event = EventService.getByIdWithHost(eventId);

  if (!event) {
    res.status(404).json({
      error: 'Event not found',
      eventId,
    });
    return;
  }

  res.render('events/detail', {
    title: 'Dining Events',
    event,
    user: req.session.user
  })
});

// Search or filter by event's name or date
router.get('/', (req: Request, res: Response) => {
  const query = (req.query.search as string) || '';
  const date = (req.query.date as string) || '';

  let events = eventDb.getAll();

  if (query) {
    events = eventDb.searchByName(query);
  }

  if (date) {
    events = eventDb.filterByDate(date);
  }
  
  const eventsWithHostName = events.map(evt => ({
    ...evt,
    hostName: userDb.getById(evt.host)?.name ?? 'Unknown'
  }));

  res.render('events/list', {
    title: 'Dining Events',
    events: eventsWithHostName,
    user: req.session.user,
    search: query,
    date,
    query,
  })
});

export default router;
