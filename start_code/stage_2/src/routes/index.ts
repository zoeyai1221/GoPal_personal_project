import { Request, Response, Router } from 'express';
import databaseManagerInstance from '../db/databaseManager';

const router: Router = Router();
const eventDb = databaseManagerInstance.getEventDb();
const userDb = databaseManagerInstance.getUserDb();

// Home route - now displays events list by default
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
    title: 'Events',
    events: eventsWithHostName,
    user: req.session.user,
    search: query,
    date,
    query,
  })
});

export default router;
