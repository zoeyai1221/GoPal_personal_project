import { Request, Response, Router } from 'express';
import { Event } from '../types';

const router: Router = Router();

// Home route - now displays events list by default
router.get('/', (req: Request, res: Response) => {
  // Get sample events data (same as in events.js)
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

export default router;
