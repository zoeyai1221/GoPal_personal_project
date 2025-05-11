# GoPal Stage 3: Modern Web App with React & Express

This starter code provides a basic structure for a modern web application using React for the frontend and Express.js for the backend API. The application is a dining event planning platform where users can create, join, and manage dining events.

## Project Structure

```
/starter_code/stage_3/
├── package.json            # Root package.json for running both frontend and backend
├── backend/                # Express.js API backend
│   ├── src/
│   │   ├── app.ts          # Express setup
│   │   ├── server.ts       # Server entry point
│   │   ├── routes/         # API route definitions
│   │   ├── middlewares/    # Express middlewares
│   │   ├── types/          # TypeScript definitions
│   │   └── __tests__/      # Jest test files
│   ├── package.json        # Backend dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   └── webpack.config.js   # Webpack configuration
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React contexts
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript definitions
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript configuration
└── README.md               # This file
```

## Technologies Used

### Backend
- Express.js - Web framework
- TypeScript - Type safety
- JWT - Authentication
- Webpack - Bundling
- Jest - Testing

### Frontend
- React - UI library
- TypeScript - Type safety
- Ant Design - UI component library
- React Router - Navigation
- Axios - HTTP client

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

#### Project Setup (All-in-One)
1. Install all dependencies at once:
```bash
cd starter_code/stage_3
npm run install:all
```

2. Start both backend and frontend concurrently:
```bash
npm run dev
```

The frontend will run on http://localhost:3000 and the backend on http://localhost:8080.

#### Backend Setup (Individual)
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev           # Run with ts-node-dev
# OR
npm run dev:webpack   # Run with webpack (watch mode)
```

5. Run tests:
```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate test coverage report
```

#### Frontend Setup (Individual)
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## API Endpoints

The backend provides the following API endpoints:

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/join` - Join event

## Implementation Notes

This is a starter code with minimal implementation. You'll need to:

1. Implement actual database interactions (currently uses mock data)
2. Add validation and error handling
3. Expand features and UI components as needed
4. Add more comprehensive tests
5. Enhance security

## Authentication

Authentication is implemented using JWT (JSON Web Tokens). The token is stored in localStorage and included in API requests via an Axios interceptor.

## UI Components

The frontend uses Ant Design components for the UI. Key components include:
- Login/Register forms
- Event cards and lists
- Profile form
- Layout with header and navigation

## Testing

The project includes a basic Jest setup for testing backend endpoints. Run tests with:

```bash
cd backend
npm test
```

Example test files are provided in `backend/src/__tests__/` to get you started.

## Development with Webpack

The backend uses Webpack for bundling TypeScript code into a distributable package. This provides:

1. Efficient compilation and bundling
2. Support for different environments via webpack modes
3. Optimized production builds

To build the backend with webpack:

```bash
cd backend
npm run build  # Produces optimized production build
```

## Next Steps for Development

1. Create a database schema for users, events, etc.
2. Implement actual database connections (e.g., MongoDB, PostgreSQL)
3. Add input validation and better error handling
4. Add more features such as event comments, ratings, etc.
5. Enhance the UI/UX
6. Expand the test suite with more comprehensive tests
