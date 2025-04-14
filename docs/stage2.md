# Stage 2: Building a Functional Web App with Custom Database & Client Interaction

---

## 📚 Knowledge Base

### 🔄 Recap from Previous Stages
Before continuing, students should already understand:
- How to run a basic Node.js + TypeScript server (from Stage 1)
- What promises are and how to load files asynchronously (from Stage 1.5)
- What rendering an HTML file via server means

---

### 🗂️ What Is a Database, Really?

Let's break it down:

- A **database** is a system that *stores data and allows us to retrieve or modify it efficiently*.
- At its core, it's a structured way of organizing **objects** (like users, events, restaurants) and enabling **queries** to access them.

#### 💭 Analogy
Imagine your app is a kitchen. A **database** is your pantry:
- You store ingredients (data)
- You label them (keys/IDs)
- You organize them for quick access (indexes/sorting)
- You might keep a clipboard to track what's missing or added (logs/transactions)

---

### 🧠 Memory vs. File-Based Storage

| Feature | In-Memory | File-Based |
|--------|-----------|-------------|
| Speed | 🟢 Very fast | 🟡 Slower |
| Volatility | 🔴 Data gone on restart | 🟢 Persistent |
| Use Case | Temporary caching, testing | Saving long-term data |
| Complexity | 🔵 Easy | 🔵 Easy to Medium (with async logic) |

You should store data **in-memory while the app is running** and save a **backup to disk** so the data survives app restarts.

> 🔄 This is **not** a proper production DB — it's a naive version to teach the basics.

---

### 📁 How Node.js Handles Files (Quick Recap)

We use Node's built-in `fs` and `path` modules.

- `fs.readFile(filePath).then(...)` – loads a file
- `fs.writeFile(filePath, data)` – writes new data
- Always handle files **asynchronously** using `then()`/`catch()` to avoid blocking the main thread

Relative path (`./data/events.json`) vs. Absolute path (`/Users/will/Project/...`) depends on where your script runs. Stick to **relative** for now.

---

### 🧠 Structuring Your Custom Database

You'll build a simple class like this:

```ts
class EventDatabase {
  private events: Event[] = [];

  async loadFromDisk() {
    const raw = await fs.readFile('./data/events.json', 'utf-8');
    this.events = JSON.parse(raw);
  }

  async saveToDisk() {
    await fs.writeFile('./data/events.json', JSON.stringify(this.events, null, 2));
  }

  addEvent(event: Event) {
    this.events.push(event);
  }

  findEventsByUser(userId: string) {
    return this.events.filter(e => e.userIds.includes(userId));
  }
}
```

---

### 🔐 Data Types: Events, Users, Restaurants

Keep things simple by treating each entity as plain JavaScript/TypeScript objects:

```ts
type Event = {
  id: string;
  name: string;
  restaurantId: string;
  userIds: string[];
};

type User = {
  id: string;
  name: string;
};

type Restaurant = {
  id: string;
  name: string;
};
```

These will live in **separate files** under `data/`.

---

### 🔁 Connecting This to Your Server

You'll need a router that does:
- `GET /events` — returns a list of events
- `POST /events` — adds a new event (and saves to file)

Same for users and restaurants. You'll use `fs.readFile` and `fs.writeFile` behind the scenes for persistence.

---

### 🔹 HTML Forms + Frontend Buttons
- HTML pages can include **forms** to send data back to the server.
- Client-side JS can enhance user experience by **handling events** without page reloads.

#### Key Concepts:
- **HTML Forms**:
  - Simple UI to gather user input.
  - Can send `POST` requests to the server (e.g. create new user).
  - Example:
    ```html
    <form action="/users" method="POST">
      <input type="text" name="name" placeholder="Your name">
      <input type="email" name="email" placeholder="Your email">
      <button type="submit">Create User</button>
    </form>
    ```

- **JavaScript Buttons**:
  - Add buttons with `onclick` to update UI or send fetch requests.
  - Useful for things like: "Add to favorites", "RSVP to event", etc.
  - Example:
    ```html
    <button onclick="joinEvent('event-123')">Join Event</button>
    
    <script>
    function joinEvent(eventId) {
      fetch(`/events/${eventId}/join`, {
        method: 'POST'
      })
      .then(response => response.json())
      .then(data => {
        alert('You joined the event!');
        // Update the UI
      });
    }
    </script>
    ```

- **Dynamic Rendering**:
  - Use JS to change content on the page without reloading it.
  - Example:
    ```js
    document.getElementById('attendee-count').textContent = '5 people';
    ```

- **Fetch API**:
  - Modern way to send requests from the browser.
  - Returns Promises for clean async code.
  - Example:
    ```js
    fetch('/api/events')
      .then(response => response.json())
      .then(events => {
        // Do something with the events data
        console.log(events);
      });
    ```

---

### 🔹 Server API Design (Bare Minimum)
- Your server now needs to accept and process user-submitted data.

#### Key Concepts:
- **API Endpoints**:
  - Think of them as "doors" the client can knock on to ask for data or make changes.
  - Should follow RESTful principles where possible:
    - `GET /resource` - Get list
    - `GET /resource/:id` - Get specific item
    - `POST /resource` - Create new
    - `PUT /resource/:id` - Update existing
    - `DELETE /resource/:id` - Delete

- **Examples**:
  ```javascript
  // Express route to get all events
  app.get('/api/events', (req, res) => {
    res.json(eventDatabase.getAll());
  });

  // Express route to create a new event
  app.post('/api/events', (req, res) => {
    const newEvent = req.body;
    eventDatabase.addEvent(newEvent);
    eventDatabase.saveToDisk();
    res.json({ success: true, event: newEvent });
  });
  ```

- **Processing Form Data**:
  - For Express, use a middleware like `express.urlencoded()` or `body-parser`.
  - For raw Node.js:
    ```js
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const name = formData.get('name');
      const email = formData.get('email');
      // Process the data...
    });
    ```

- **Returning Responses**:
  - Return JSON for API endpoints.
  - Return HTML for page requests.
  - Always include proper status codes (200 for success, 404 for not found, etc.).
  - Example:
    ```js
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
    ```

---

### 🕸️ Tying It All Together
Here's how everything connects:

1. **Browser** sends request (form submit or fetch API)
2. Your **server** receives it through an endpoint
3. **In-Memory DB** processes the data
4. Data is **persisted to JSON files**
5. **Response** goes back to browser
6. **UI updates** (page reload or JavaScript update)

This architecture gives you an end-to-end data flow that mirrors how real-world applications work, just simplified for learning purposes.

---

## 🧪 Assignment Checkpoint

### 🎯 Assignment Goal:
Build a mini dining events application using TypeScript, Express, and your own custom in-memory + file-based database system. Users will be able to:
- Browse dining events
- Create new dining events
- Join existing events
- Update their profile information

### 🪜 Assignment Steps

#### 🏗 1. Define Your Entities

Create TypeScript interfaces for your core entities:

```typescript
// User entity
interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this should be hashed!
}

// Restaurant entity
interface Restaurant {
  id: string;
  name: string;
  location: string;
  cuisine: string;
}

// Event entity
interface Event {
  id: string;
  name: string;
  date: string; // ISO format date string
  time: string; // Time in 24h format
  description: string;
  restaurantId: string;
  hostId: string;    // User ID of who created the event
  attendees: string[]; // Array of User IDs
}
```

#### 🏗 2. Create Your Custom Database Classes

Create database modules for each entity:

```typescript
// db/userDatabase.ts
import fs from 'fs/promises';
import path from 'path';
import { User } from '../types';

export class UserDatabase {
  private users: Map<string, User> = new Map();
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '../data/users.json');
  }

  async initialize(): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const users = JSON.parse(data) as User[];
      users.forEach(user => {
        this.users.set(user.id, user);
      });
      console.log(`Loaded ${this.users.size} users from disk`);
    } catch (error) {
      console.log('No existing user data found, starting with empty database');
      // Create the directory if it doesn't exist
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      // Initialize with empty array
      await fs.writeFile(this.filePath, '[]');
    }
  }

  async save(): Promise<void> {
    const data = JSON.stringify(Array.from(this.users.values()), null, 2);
    await fs.writeFile(this.filePath, data);
    console.log(`Saved ${this.users.size} users to disk`);
  }

  getAll(): User[] {
    return Array.from(this.users.values());
  }

  getById(id: string): User | undefined {
    return this.users.get(id);
  }

  create(user: Omit<User, 'id'>): User {
    const id = Date.now().toString(); // Simple ID generation
    const newUser: User = { id, ...user };
    this.users.set(id, newUser);
    return newUser;
  }

  update(id: string, userData: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  delete(id: string): boolean {
    return this.users.delete(id);
  }

  findByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(user => user.email === email);
  }
}
```

Create similar classes for `RestaurantDatabase` and `EventDatabase`.

#### 🏗 3. Set Up Your Express Routes

```typescript
// routes/eventRoutes.ts
import { Router } from 'express';
import { EventDatabase } from '../db/eventDatabase';
import { Event } from '../types';

const router = Router();
const eventDb = new EventDatabase();

// Initialize the database when the module loads
eventDb.initialize().catch(err => {
  console.error('Failed to initialize event database:', err);
  process.exit(1);
});

// Get all events
router.get('/', (req, res) => {
  const events = eventDb.getAll();
  res.render('events/list', { 
    title: 'Dining Events', 
    events,
    user: req.session.user
  });
});

// Show the create event form
router.get('/create', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  res.render('events/create', { 
    title: 'Create Event',
    user: req.session.user
  });
});

// Create a new event
router.post('/create', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { name, date, time, description, restaurantId } = req.body;
  
  const newEvent: Omit<Event, 'id'> = {
    name,
    date,
    time,
    description,
    restaurantId,
    hostId: req.session.user.id,
    attendees: [req.session.user.id] // Host automatically joins
  };

  const event = eventDb.create(newEvent);
  await eventDb.save();
  
  res.redirect('/events');
});

// Join an event
router.post('/:id/join', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const eventId = req.params.id;
  const userId = req.session.user.id;
  
  const event = eventDb.getById(eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  if (!event.attendees.includes(userId)) {
    event.attendees.push(userId);
    await eventDb.save();
  }
  
  res.redirect('/events');
});

export default router;
```

Create similar route files for users and restaurants.

#### 🏗 4. Create Your Views (Pug Templates)

Create templates for your views using Pug:

```pug
// views/events/list.pug
extends ../layout

block content
  h1 Dining Events
  
  if user
    a.button(href='/events/create') Create New Event
  
  if events && events.length > 0
    .events-list
      each event in events
        .event-card
          h2= event.name
          p 
            strong Date: 
            | #{event.date} at #{event.time}
          p= event.description
          p
            strong Attendees: 
            | #{event.attendees.length} people joined
          
          if user
            if !event.attendees.includes(user.id)
              form(action=`/events/${event.id}/join`, method='POST')
                button(type='submit') Join Event
            else
              button(disabled) Already Joined
  else
    p No events found. Create one!
```

Create similar templates for other pages.

#### 🏗 5. Add Authentication

Implement basic login/registration:

```typescript
// routes/authRoutes.ts
import { Router } from 'express';
import { UserDatabase } from '../db/userDatabase';

const router = Router();
const userDb = new UserDatabase();

// Initialize the database when the module loads
userDb.initialize().catch(err => {
  console.error('Failed to initialize user database:', err);
  process.exit(1);
});

// Login form
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

// Handle login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = userDb.findByEmail(email);
  if (!user || user.password !== password) {
    return res.render('auth/login', {
      title: 'Login',
      error: 'Invalid email or password'
    });
  }
  
  // Create session
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email
  };
  
  res.redirect('/events');
});

// Registration form
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

// Handle registration
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.render('auth/register', {
      title: 'Register',
      error: 'Passwords do not match',
      name,
      email
    });
  }
  
  if (userDb.findByEmail(email)) {
    return res.render('auth/register', {
      title: 'Register',
      error: 'Email already in use',
      name
    });
  }
  
  const user = userDb.create({ name, email, password });
  await userDb.save();
  
  // Create session
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email
  };
  
  res.redirect('/events');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

export default router;
```

#### 🏗 6. Set Up Your Main App

```typescript
// app.ts
import express from 'express';
import path from 'path';
import session from 'express-session';
import { UserDatabase } from './db/userDatabase';
import { RestaurantDatabase } from './db/restaurantDatabase';
import { EventDatabase } from './db/eventDatabase';

import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import authRoutes from './routes/authRoutes';

// Initialize databases
const userDb = new UserDatabase();
const restaurantDb = new RestaurantDatabase();
const eventDb = new EventDatabase();

Promise.all([
  userDb.initialize(),
  restaurantDb.initialize(),
  eventDb.initialize()
]).then(() => {
  console.log('All databases initialized successfully');
}).catch(err => {
  console.error('Error initializing databases:', err);
  process.exit(1);
});

const app = express();
const PORT = 3000;

// Configure view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Add the current user to all views
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

// Routes
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/', authRoutes);

// Home page redirects to events
app.get('/', (req, res) => {
  res.redirect('/events');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

#### 🎁 Bonus Challenges

1. **Add Image Support**: Allow restaurant and user profiles to have images
   ```typescript
   interface Restaurant {
     // ...existing properties
     imageUrl?: string;
   }
   ```

2. **Add Search and Filtering**: Implement search by event name, date, or restaurant
   ```typescript
   class EventDatabase {
     // ...existing methods
     
     searchByName(query: string): Event[] {
       query = query.toLowerCase();
       return this.getAll().filter(event => 
         event.name.toLowerCase().includes(query)
       );
     }
     
     filterByDate(date: string): Event[] {
       return this.getAll().filter(event => event.date === date);
     }
   }
   ```

3. **Create a Trip Feature**: Allow users to plan multi-day dining trips with multiple events
   ```typescript
   interface Trip {
     id: string;
     name: string;
     description: string;
     eventIds: string[];
     creatorId: string;
     startDate: string;
     endDate: string;
   }
   ```

4. **Implement User Ratings**: Let users rate events they've attended
   ```typescript
   interface Rating {
     userId: string;
     eventId: string;
     score: number; // 1-5
     comment?: string;
   }
   ```

5. **Add Real-time Updates**: Use WebSockets to update event attendance in real-time when others join

---

### 💡 Final Tips

- Remember to save to disk whenever you change your data
- Keep your code organized in separate files by functionality
- Use TypeScript's type system to catch errors early
- Don't worry about fancy UI - focus on functionality first
- Think about user experience - how can you make navigation intuitive?
- Test your app frequently as you build each feature
