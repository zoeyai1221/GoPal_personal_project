import { Router } from 'express';
import authRoutes from './auth';
import eventsRoutes from './events';
import usersRoutes from './users';

const router = Router();

// Mount the routes
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);
router.use('/users', usersRoutes);

export default router;
