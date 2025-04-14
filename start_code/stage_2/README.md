# Dining Events Web Application - Starter Code with TypeScript

This repository contains starter code for a simple Node.js Express web application with TypeScript that allows users to create, browse, and join dining events.

## Directory Structure

```
start_code/stage_2/
├── src/                    # TypeScript source files
│   ├── app.ts              # Main application entry point
│   ├── routes/             # Route handlers
│   │   ├── auth.ts         # Authentication routes
│   │   ├── events.ts       # Event-related routes
│   │   ├── index.ts        # Home page route
│   │   └── users.ts        # User-related routes
│   ├── middlewares/        # Middleware functions
│   │   └── auth.ts         # Authentication middleware
│   └── types/              # TypeScript type definitions
│       └── index.ts        # Type definitions for the application
├── dist/                   # Compiled JavaScript (generated)
├── public/                 # Static assets
│   ├── css/                # Stylesheets
│   │   └── style.css       # Main CSS file
│   └── js/                 # Client-side JavaScript
│       └── script.js       # Main JavaScript file
├── views/                  # Pug templates
│   ├── auth/               # Authentication templates
│   │   ├── login.pug       # Login form
│   │   └── register.pug    # Registration form
│   ├── events/             # Event templates
│   │   ├── create.pug      # Create event form
│   │   └── list.pug        # List of events
│   ├── users/              # User templates
│   │   └── profile.pug     # User profile page
│   ├── error.pug           # Error page
│   ├── index.pug           # Home page
│   └── layout.pug          # Base layout template
├── package.json            # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- NPM (Node Package Manager)

### Installation

1. Navigate to the project directory:
```bash
cd start_code/stage_2
```

2. Install the dependencies:
```bash
npm install
```

3. Build the TypeScript code:
```bash
npm run build
```

4. Start the application:
```bash
npm start
```

For development with automatic reload:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Current Implementation

The starter code includes:

- **TypeScript Integration**: Well-typed code with interfaces for models and requests
- **User Interface**: Complete UI for all pages using Pug templates and CSS
- **Client-side Validation**: Form validation using JavaScript
- **Navigation**: A responsive navigation bar
- **Sample Data**: Hardcoded event data for display purposes

## Backend Implementation Task

As part of the assignment, students need to implement the backend functionality:

- **User Authentication**: Implement login, registration, and session management
- **Event Management**: Create, retrieve, and update events in a database
- **User Profiles**: Allow users to update their profiles and change passwords
- **API Implementation**: Replace the 404 error responses with actual API functionality

Currently, all API endpoints return a 404 error to indicate they are not implemented. Your task is to replace these with proper implementations.

## Note for Students

The frontend is already implemented to help you focus on backend development. When implementing the backend, keep the following in mind:

- You can use any database system (MongoDB, MySQL, SQLite, etc.)
- You should implement proper error handling
- Your implementation should include input validation and security considerations
- Document any changes or additions you make to the starter code
- Follow best practices for code organization and commenting
- Utilize TypeScript's type system to ensure type safety in your code

## TypeScript Benefits

This starter code uses TypeScript, which offers several advantages:

- **Type Safety**: Catch errors during development rather than at runtime
- **Better Tooling**: Enhanced IDE support with autocompletion and error detection
- **Code Documentation**: Type definitions serve as documentation for your code
- **Improved Maintainability**: Makes the codebase easier to refactor and maintain

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Pug Template Engine](https://pugjs.org/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
