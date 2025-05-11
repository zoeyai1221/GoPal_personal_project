import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRoutes from './routes';

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL || 'https://example.com' 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'GoPal API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      events: '/api/events',
      users: '/api/users'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

export default app;
