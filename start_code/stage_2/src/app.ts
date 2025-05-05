import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Import databases
import { UserDatabase } from './db/userDatabase';
import { EventDatabase } from './db/eventDatabase';

// Import routes
import indexRouter from './routes/index';
import eventRouter from './routes/events';
import userRouter from './routes/users';
import authRouter from './routes/auth';

// Import types
import { CustomError } from './types';

// Initialize databases
const userDb = new UserDatabase();
const eventDb = new EventDatabase();

Promise.all([
  userDb.initialize(),
  eventDb.initialize(),
]).then(() => {
  console.log('All databases initialized successfully');
}).catch(err => {
  console.error('Error initializing databases:', err);
  process.exit(1);
});

// Initialize Express app
const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Set up view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// Set up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: 'dining-events-app',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));


// Add the current user to all views
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

// Use routes
app.use('/', indexRouter);
app.use('/events', eventRouter);
app.use('/users', userRouter);
app.use('/', authRouter);

// Home page redirect to events
app.get('/', (req, res) => {
  res.redirect('/events');
});

// Error handling middleware - 404
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: CustomError = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling middleware - general errors
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
