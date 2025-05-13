import { Request, Response, Router } from 'express';
import { EventService } from '../services/eventService';

const router: Router = Router();

// Home route - now displays events list by default
router.get('/', (req: Request, res: Response) => {
  const events = EventService.getAllWithHostName();
  
  res.render('events/list', { 
    title: 'Events', 
    events, 
    user: req.session.user 
  });
});

export default router;
