import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { Event, AuthRequest } from '../types';

const router = Router();

// Mock events data
const events: Event[] = [
  {
    id: 1,
    name: 'Team Lunch',
    location: 'Italian Restaurant',
    date: '2023-05-20',
    time: '12:30',
    description: 'Monthly team lunch to discuss progress',
    host: 'Demo User',
    attendees: 5,
    maxAttendees: 10
  },
  {
    id: 2,
    name: 'Coffee Meeting',
    location: 'Starbucks',
    date: '2023-05-22',
    time: '14:00',
    description: 'Discuss new project ideas',
    host: 'Demo User',
    attendees: 2,
    maxAttendees: 4
  }
];

/**
 * @route GET /api/events
 * @desc Get all events
 * @access Public
 */
router.get('/', (req: Request, res: Response) => {
  try {
    // In a real application, this would fetch from a database
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route GET /api/events/:id
 * @desc Get event by ID
 * @access Public
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const event = events.find(event => event.id === id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route POST /api/events
 * @desc Create a new event
 * @access Private
 * 
 * TODO: Implement actual event creation
 */
router.post('/', authMiddleware, (req: Request, res: Response) => {
  try {
    const { name, location, date, time, description, maxAttendees } = req.body;
    const authReq = req as AuthRequest;
    
    // Validate input
    if (!name || !location || !date || !time || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    // Create a new event (mock implementation)
    const newEvent: Event = {
      id: events.length + 1,
      name,
      location,
      date,
      time,
      description,
      host: authReq.user?.name || 'Unknown Host',
      attendees: 1,
      maxAttendees
    };
    
    // In a real app, this would be saved to a database
    // events.push(newEvent);
    
    res.status(201).json({
      success: true,
      data: newEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route PUT /api/events/:id
 * @desc Update an event
 * @access Private
 * 
 * TODO: Implement actual event update
 */
router.put('/:id', authMiddleware, (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, location, date, time, description, maxAttendees } = req.body;
    
    // Find event
    const eventIndex = events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // In a real app, check if user is authorized to update this event
    
    // Update event (mock implementation)
    const updatedEvent: Event = {
      ...events[eventIndex],
      name: name || events[eventIndex].name,
      location: location || events[eventIndex].location,
      date: date || events[eventIndex].date,
      time: time || events[eventIndex].time,
      description: description || events[eventIndex].description,
      maxAttendees: maxAttendees || events[eventIndex].maxAttendees
    };
    
    // In a real app, save to database
    // events[eventIndex] = updatedEvent;
    
    res.json({
      success: true,
      data: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route DELETE /api/events/:id
 * @desc Delete an event
 * @access Private
 * 
 * TODO: Implement actual event deletion
 */
router.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Find event
    const eventIndex = events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // In a real app, check if user is authorized to delete this event
    
    // In a real app, delete from database
    // events.splice(eventIndex, 1);
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route POST /api/events/:id/join
 * @desc Join an event
 * @access Private
 * 
 * TODO: Implement actual join event functionality
 */
router.post('/:id/join', authMiddleware, (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Find event
    const event = events.find(event => event.id === id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if event is full
    if (event.maxAttendees && event.attendees >= event.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: 'Event is already full'
      });
    }
    
    // In a real app, add user to attendees list
    // event.attendees += 1;
    
    res.json({
      success: true,
      message: 'Successfully joined event',
      data: {
        ...event,
        attendees: event.attendees + 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
