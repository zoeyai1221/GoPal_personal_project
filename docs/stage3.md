# Stage 3: Moving to modern UI frameworks

## Part 1 - 📜 A Brief History of Frontend Development

> *How did we get from plain HTML pages to modern web apps? This section walks through that journey.*

---

### 🪐 Phase 0: The Static Web (1990s–Early 2000s)

**Pages were just files.** Think `index.html`, `about.html`. There was no backend logic—only pure HTML, CSS, and some tiny scripts.

* ✅ Easy to host
* ❌ No personalization
* ❌ Content updates = manual edits

```
📄 index.html
📄 about.html
```

---

### 🔥 Phase 1: Server-Side Rendering (SSR) with Plain HTML

Developers started generating HTML **dynamically on the server**, usually with languages like:

* **PHP** (WordPress, forums)
* **Ruby on Rails**
* **Java (JSP)**
* **Python (Django)**

This made pages dynamic based on user data or database content.

(Amazon retail website is still around this phase in 2025 🫡)

#### Pros:

* Dynamic content per user/session
* Simple model: Server does all the work

#### Cons:

* Server re-renders the whole page on **every request**
* Page reloads = slow user experience

```
🧠 Server = Template Engine + Data -> HTML -> Client
```

---

### 🧩 Phase 2: Templating Engines (Mid 2000s–2015)

Server-side templating tools emerged to make HTML rendering cleaner and more reusable:

| Tool       | Stack   | What it does                                       |
| ---------- | ------- | -------------------------------------------------- |
| Pug (Jade) | Node.js | Use indentation to write cleaner HTML              |
| EJS        | Node.js | Mix HTML with JS variables like `<%= user.name %>` |
| Handlebars | JS/Node | Logic-less templating with `{{user.name}}`         |

#### Example (Pug):

```pug
ul
  each user in users
    li= user.name
```

#### Visualization:

```
[TEMPLATING ENGINE]
   ↓
Template + Data
   ↓
Rendered HTML
   ↓
Client Browser
```

#### Pros:

* Reuse HTML structure with dynamic data
* More readable than pure string concatenation

#### Cons:

* Still requires full-page reloads
* Can't handle modern, app-like interactions well

---

### 🧱 Phase 3: Early Frontend Frameworks (2010–2015)

To build **more interactive UIs** (like dashboards, drag/drop, search-as-you-type), client-side frameworks emerged:

| Framework       | Notes                                              |
| --------------- | -------------------------------------------------- |
| **Backbone.js** | Gave structure to JS apps (models, views, routers) |
| **AngularJS**   | Two-way binding, templating, powerful features     |
| **Ember.js**    | Convention-over-configuration, ambitious apps      |

These ran **in the browser**, fetching data from the backend with **AJAX**.

#### Problems they solved:

* Handle user interaction without reloading
* Separate data from display logic
* Provide routing on the client

#### Challenges:

* Complex, inconsistent patterns
* Performance and maintainability concerns
* Hard to test and scale

---

### ⚛️ Phase 4: Component-Based UI (React & Beyond, 2015–Today)

**React** changed the game with:

* 📦 **Components** – encapsulated, reusable building blocks
* ⚡ **Virtual DOM** – updates only changed parts
* 🔄 **One-way data flow** – simpler debugging

#### Modern React Best Practices (as of today):

* **Functional components**
* **Hooks** (`useState`, `useEffect`, `useContext`, etc.)
* **JSX** syntax: looks like HTML inside JS

```jsx
function UserCard({ user }) {
  return <div className="card">{user.name}</div>;
}
```

#### Key React Ecosystem Tools:

| Tool                  | What it does                          |
| --------------------- | ------------------------------------- |
| **React Router**      | URL-based routing in single-page apps |
| **React Query / SWR** | Simplified data fetching              |
| **Tailwind CSS**      | Utility-first CSS styling             |
| **Vite / Next.js**    | App tooling and optimization          |

---

### 🌐 Bonus: The Rise of SPAs, CDNs, and Hybrid Rendering

Today, we also use:

* **Single Page Applications (SPAs)** – React/Vue/Angular apps that load once and update dynamically
* **CDNs** – Distribute static files (images, JS, CSS) closer to users
* **Server-Side Rendering with React (Next.js)** – Best of both worlds: fast loads + SEO + rich interactivity

---

### 🧭 Timeline Overview

```text
[1995] Static HTML
    ↓
[2000s] Server-Side Rendering (PHP, Rails)
    ↓
[2010s] Templating Engines (Pug, EJS)
    ↓
[2012–2016] Backbone, AngularJS
    ↓
[2015+] React, Vue, Modern SPAs
    ↓
[2020+] Next.js, SSR + Client Hydration, Server Components
```

---

### 🚀 Summary: Why This Matters

| Era                 | Style             | Weakness                    |
| ------------------- | ----------------- | --------------------------- |
| Static              | Files only        | No logic or dynamic content |
| SSR                 | Server templating | Slow, page reloads          |
| Templating          | Cleaner SSR       | Still server-bound          |
| Frontend Frameworks | Dynamic apps      | Complex, learning curve     |
| React               | Component-based   | Needs tooling, but worth it |

---



## Part 2 - ⚛️ React Core Concepts: Deep Dive

### 0. **What is React**

React is a JavaScript library for building user interfaces with components. It was created by Facebook in 2013 and has become the most popular frontend framework today.

React breaks your UI into components, making it easier to:

- Reuse code

- Organize large projects

- Create highly interactive apps

### 1. **JSX – JavaScript XML**

**What is JSX?**

JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It's used with React to describe what the UI should look like.

**Example:**

```jsx
// a mixed javascript syntax and html syntax
const element = <h1>Hello, world!</h1>;
```

**Why use JSX?**

* **Readability**: Makes the code more readable and expressive.
* **Integration**: Allows you to write HTML structures in the same file as JavaScript code.

---

### 2. **Components – Building Blocks of React**

**What are Components?**

Components are independent, reusable pieces of UI in a React application. They can be either class-based or function-based (but function-based is more popular).

**Function Component Example:**

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Then you can import this function as a component in another component like this to construct a full page
import { Welcome } from "..."

function Page(props) {
    return (
        <div>
            <Welcome />
        </div>
    )
}
```

**Why use Components?**

* **Reusability**: Components can be reused across different parts of the application.
* **Maintainability**: Helps in organizing the codebase into manageable pieces.

**Visualization:**

An example app structure
```
App Component
├── Header Component
├── Main Component
│   ├── Sidebar Component
│   └── Content Component
└── Footer Component
```

---

### 3. **Props – Passing Data to Components**

**What are Props?**

Props (short for properties) are read-only attributes used to pass data from a parent component to a child component.

**Example:**

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}

<Greeting name="Alice" />
```

**Why use Props?**

* **Data Flow**: Enables the flow of data from parent to child components.
* **Customization**: Allows components to be dynamic and customizable depending on where they are presented.

**Visualization:**

```
Parent Component
  └── Child Component (receives props)
```

---

### 4. **State – Managing Component Data**

**What is State?**

State is a built-in function that allows components to create and manage their own data.

**Using `useState` Hook:**

```jsx
import { useState } from 'react';

function Counter() {
  // this count value is initialized as 0 (in the useState call)
  // change count value directly does not change the state, i.e.
  // directly do count = 2 doesn't update the count value on UI
  // you must call setCount(newCountValue) to make an effect on UI.
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      {/* Event listener to update count */}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

**Why use State?**

* **Dynamic Behavior**: Enables components to respond to user input and other events.

**Visualization:**

```
Initial State: count = 0
User clicks button
State Change: count = 1
Component re-renders with new count
```

Sometimes you might want to use states across multiple components (shared data), then there are a few strategies:

---

#### 🪢 1. **Pass State *Down* via Props**

You manage state in a **parent component**, then pass it (and often a setter function) to **child components** through props.

##### Example:

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Child count={count} increment={() => setCount(count + 1)} />
    </div>
  );
}

function Child({ count, increment }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

✅ This is the **standard pattern**: state lives higher up in the tree, and is passed *down* to children as needed.

---

#### 🔁 2. **Lifting State *Up***

Sometimes two sibling components need to share the same state. In that case, you **lift** the state up to their **common parent**, then pass it down to both.

##### Visualization:

```
       CommonParent
        /       \
   Sibling1    Sibling2
```

---

#### 🔄 3. **Global State with Context or State Libraries**

If passing props through many layers becomes messy, use **React Context** or a state management library like **Zustand, Redux, or Jotai**.

* **Context**: Good for global but relatively static data (like user info or theme).
* **Zustand/Recoil/Redux**: Good for more complex app-wide state management.

---

### 5. **useEffect – Handling Side Effects**

**What is `useEffect`?**

The `useEffect` Hook lets you perform side effects (i.e. UI updates) in function components, such as data fetching (show some different UI when data is fetched from backend).

**Example:**

```jsx
import { useState, useEffect } from 'react';

function Example() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // Empty dependency array means this runs once after initial render

  // when page first load, the data value is null, which triggers "Loading"
  // rendering state, meanwhile, useEffect starts to make request to backend,
  // once the data is downloaded, the data object is updated with value, which
  // will render message instead of loading
  // this is useful for the UI to show something while backend data isn't available.
  return <div>{data ? data.message : 'Loading...'}</div>;
}
```

**Why use `useEffect`?**

* **Data Fetching**: Retrieve data after the component mounts.
* **Subscriptions**: Set up subscriptions or timers.

**Visualization:**

```
Component Renders
  ↓
useEffect Hook Executes
  ↓
Fetch Data from API
  ↓
Update State with Fetched Data
  ↓
Component Re-renders with New Data
```

---

### 🧠 Summary Table

| Concept    | Purpose                               | Example Syntax                                |
| ---------- | ------------------------------------- | --------------------------------------------- |
| JSX        | Write HTML-like syntax in JavaScript  | `<h1>Hello</h1>`                              |
| Components | Reusable UI building blocks           | `function MyComponent() { return <div />; }`  |
| Props      | Pass data to components               | `<MyComponent title="Hello" />`               |
| State      | Manage dynamic data within components | `const [count, setCount] = useState(0);`      |
| useEffect  | Handle side effects in components     | `useEffect(() => { /* side effect */ }, []);` |


### Some additional resources

---

#### 📘 JSX (JavaScript XML)

* **React Official Documentation: Introducing JSX**
  An introduction to JSX, explaining its syntax and how it integrates with React to describe UI components.
  [https://legacy.reactjs.org/docs/introducing-jsx.html](https://legacy.reactjs.org/docs/introducing-jsx.html)

* **W3Schools: React JSX**
  A beginner-friendly guide to JSX, illustrating how it allows writing HTML elements in JavaScript.
  [https://www.w3schools.com/react/react\_jsx.asp](https://www.w3schools.com/react/react_jsx.asp)

* **freeCodeCamp: JSX in React – Explained with Examples**
  Provides an in-depth look at JSX with practical examples to help you grasp its usage in React.
  [https://www.freecodecamp.org/news/jsx-in-react-introduction/](https://www.freecodecamp.org/news/jsx-in-react-introduction/)

---

#### 🧩 Components

* **React Official Documentation: Your First Component**
  Explains how to create and use components in React, emphasizing their reusability and isolation.
  [https://react.dev/learn/your-first-component](https://react.dev/learn/your-first-component)

* **W3Schools: React Components**
  Covers the basics of React components, including function and class components, with examples.
  [https://www.w3schools.com/react/react\_components.asp](https://www.w3schools.com/react/react_components.asp)

* **GeeksforGeeks: ReactJS Components**
  Delves into the creation and usage of React components, highlighting their role in building UIs.
  [https://www.geeksforgeeks.org/reactjs-components/](https://www.geeksforgeeks.org/reactjs-components/)

---

#### 📦 Props

* **React Official Documentation: Passing Props to a Component**
  Details how props are used to pass data between components, with examples of their implementation.
  [https://react.dev/learn/passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)

* **W3Schools: React Props**
  Provides a straightforward explanation of props, demonstrating how to use them in React components.
  [https://www.w3schools.com/react/react\_props.asp](https://www.w3schools.com/react/react_props.asp)

* **freeCodeCamp: How to Use Props in React**
  Offers a comprehensive overview of props in React, including how to use them effectively in your applications.
  [https://www.freecodecamp.org/news/how-to-use-props-in-react/](https://www.freecodecamp.org/news/how-to-use-props-in-react/)

---

#### 🔄 State

* **React Official Documentation: Managing State**
  Discusses state management in React, including how to structure and update state within components.
  [https://react.dev/learn/managing-state](https://react.dev/learn/managing-state)

* **W3Schools: React State**
  Explains the concept of state in React components, with examples of how to initialize and update state.
  [https://www.w3schools.com/react/react\_state.asp](https://www.w3schools.com/react/react_state.asp)

* **freeCodeCamp: What is State in React – Explained with Examples**
  Provides an in-depth look at state in React, including practical examples to illustrate its use.
  [https://www.freecodecamp.org/news/what-is-state-in-react-explained-with-examples/](https://www.freecodecamp.org/news/what-is-state-in-react-explained-with-examples/)

---

#### 🌀 useEffect Hook

* **React Official Documentation: useEffect**
  Introduces the `useEffect` hook, explaining how to perform side effects in function components.
  [https://react.dev/reference/react/useEffect](https://react.dev/reference/react/useEffect)

* **W3Schools: React useEffect Hooks**
  Offers a beginner-friendly guide to the `useEffect` hook, with examples of its usage in React components.
  [https://www.w3schools.com/react/react\_useeffect.asp](https://www.w3schools.com/react/react_useeffect.asp)

* **GeeksforGeeks: ReactJS useEffect Hook**
  Provides a detailed explanation of the `useEffect` hook, including scenarios where it's commonly used.
  [https://www.geeksforgeeks.org/reactjs-useeffect-hook/](https://www.geeksforgeeks.org/reactjs-useeffect-hook/)

---

## Part 3 - React Libraries 

Building react components by yourself is sometimes time-consuming, but often you can use libraries to simplify the
development process. 

An example react library is Ant Design: https://ant.design/components/overview/

A simple React code that uses the library

```jsx
import React, { useState } from 'react';
import { DatePicker, Button, message } from 'antd';
import 'antd/dist/antd.css';

const App = () => {
  const [date, setDate] = useState(null);

  const handleChange = (value) => {
    setDate(value);
    message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
  };

  return (
    <div style={{ padding: '50px' }}>
      <DatePicker onChange={handleChange} />
      <Button type="primary" style={{ marginLeft: '10px' }}>
        Submit
      </Button>
    </div>
  );
};

export default App;
```

## Part 4 - 📘 API Documentation & Manual Testing

---

When your frontend talks to the backend (or your backend talks to other services), it's done through **APIs**. 
It exists as a contract between service and client to clarify requirements and responses.

---

### 📄 What Is an API Document?

API docs are like a **menu** of what a backend server offers. It tells you:

* **What endpoints** exist
* **How to call them**
* **What they return**

| Part         | Example                                     |
| ------------ | ------------------------------------------- |
| Method       | `POST`                                      |
| URL          | `/api/events`                               |
| Request Body | `{"title": "Dinner", "location": "Bistro"}` |
| Response     | `{"status": "success", "id": "evt123"}`     |

Some real world API examples:
- Discord https://discord.com/developers/docs/reference
- Github https://docs.github.com/en/rest?apiVersion=2022-11-28

For our app, having an API document for backend helps you decouple frontend code and backend
code, and evolve frontend code while keeping backend untouched.

---

### 🧾 Sample API Doc Entry

---

#### POST `/api/events`

Create a new event.

###### 🔻 Request Body

```json
{
  "title": "Dinner",
  "location": "Bistro",
  "time": "7PM"
}
```

###### 🔼 Response

Status code: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Status

Common ones:
- 200
- 302
- 400
- 404
- 500

```json
{
  "status": "success",
  "event": {
    "id": "evt123",
    "title": "Dinner",
    "location": "Bistro",
    "time": "7PM"
  }
}
```

###### ❌ Errors

* `400 Bad Request`: Missing fields
* `500 Internal Server Error`: Something broke

---

### 🧪 Testing APIs Manually

#### 🛠 Option 1: `curl` (Command-Line Testing)

`curl` lets you make API calls from the terminal.

###### Example: Create an Event (POST)

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title": "Lunch", "location": "Café", "time": "12PM"}'
```

###### Example: Get All Events (GET)

```bash
curl http://localhost:3000/api/events
```

---

#### 🧰 Option 2: Postman (GUI Testing)

Postman is a desktop app for interacting with APIs. https://www.postman.com/

###### How to Use It:

1. Open Postman → **New Request**
2. Select method: `GET`, `POST`, etc.
3. Paste URL: `http://localhost:3000/api/events`
4. For `POST`, go to **Body → raw → JSON**, paste your JSON
5. Click **Send** → See response!

###### Why It’s Great:

* Visual interface
* Easy to organize requests
* Saves past calls
* Debug headers and response time

---

#### 🧠 Option 3: Chrome DevTools for Live API Calls

When using a web frontend, you can **inspect actual requests** made by your app using Chrome DevTools.

###### 🧪 How to Inspect Requests:

1. Open your React frontend in Chrome
2. Right-click → **Inspect** (or press `Cmd+Option+I` / `Ctrl+Shift+I`)
3. Go to **Network** tab
4. Perform an action (e.g., click a button that fetches events)
5. Find the network request (`/api/events`) in the list
6. Click it to see:

   * Request **method**
   * **Headers** sent
   * **Request body** (under “Payload” tab)
   * **Response** from server

> 🔎 **Tip**: Right-click → “Copy → Copy as cURL” to get a terminal-ready version of the request!

---

#### 🔁 From DevTools to Postman/cURL

DevTools helps you **extract** real-world request formats:

* See exact payload your frontend sends
* Copy as curl to test from terminal
* Paste into Postman to reproduce issues

📌 This is especially useful when frontend is broken, and you want to isolate whether the bug is in frontend or backend.

---

### 🔍 How to Read Responses

#### 3 Things to Check in a Response:

| Part        | Meaning                                          |
| ----------- | ------------------------------------------------ |
| Status Code | 200 = OK, 400 = Client Error, 500 = Server Error |
| Headers     | Like `Content-Type: application/json`            |
| Body        | Actual JSON or error message returned            |

You can start with putting them in `api-docs.md` or your `README.md`.

---

## Part 5 - ✅ Backend Testing with Jest

---

### 🧠 Why Do We Write Tests?

Tests ensure:

* Your code does what it should (now and in the future)
* You can safely refactor without breaking things
* Bugs are caught early and fixed faster

Jest is a **popular JavaScript testing framework** that makes writing and running tests simple, especially in Node.js environments.

---

### ⚙️ Setting Up Jest in Node.js

Install Jest with:

```bash
npm install --save-dev jest
```

Add this to `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Run tests with:

```bash
npm test
```

> 💡 If you're using TypeScript, install `ts-jest` too:

```bash
npm install --save-dev ts-jest @types/jest
npx ts-jest config:init
```

---

### 📏 Basic Test Structure

A test file usually looks like this:

```ts
// sum.test.ts
import { sum } from './sum';

test('adds 2 + 3 to equal 5', () => {
  expect(sum(2, 3)).toBe(5);
});
```

Jest runs every `.test.ts` or `.spec.ts` file by default.

---

### 🧱 What Is Mocking?

Mocks let you **simulate modules or dependencies** without running the real code. This helps:

* Isolate your test (test only one part of code)
* Avoid network calls, database writes, etc.
* Simulate different edge cases or failures

---

### ✨ Example: Mocking a Database

Imagine your `createEvent` function writes to a file or database:

```ts
// eventService.ts
import { writeFile } from 'fs/promises';

export async function saveEvent(event) {
  await writeFile('./data.json', JSON.stringify(event));
}
```

Instead of actually writing the file in your test, **mock it**:

```ts
// eventService.test.ts
import * as fs from 'fs/promises';
import { saveEvent } from './eventService';

jest.mock('fs/promises');

test('saves an event', async () => {
  const mockWrite = fs.writeFile as jest.Mock;
  mockWrite.mockResolvedValue(undefined); // simulate success

  await saveEvent({ title: 'Dinner' });

  expect(mockWrite).toHaveBeenCalled();
  expect(mockWrite).toHaveBeenCalledWith('./data.json', expect.stringContaining('Dinner'));
});
```

> 🔁 You can use `mockResolvedValue`, `mockRejectedValue`, `mockReturnValue`, and more to simulate behavior.

---

### 🤖 Mocking Your Own Module

Imagine you have a module that fetches users:

```ts
// userService.ts
export async function getUser(id) {
  // fetch from DB
}
```

In your test:

```ts
jest.mock('./userService');

import * as userService from './userService';
import { getEventWithUser } from './eventController';

test('loads user for event', async () => {
  (userService.getUser as jest.Mock).mockResolvedValue({ id: 'u1', name: 'Alice' });

  const result = await getEventWithUser('event1');
  expect(result.user.name).toBe('Alice');
});
```

---

### 🧪 Summary of Jest Concepts

| Feature       | What It Does                      |
| ------------- | --------------------------------- |
| `test` / `it` | Defines a test case               |
| `expect`      | Makes assertions about the result |
| `beforeEach`  | Setup code before every test      |
| `mock`        | Replace a dependency in test      |
| `supertest`   | Call API endpoints in tests       |

---

### 📦 Suggested File Layout

```
src/
  controllers/
    eventController.ts
  services/
    eventService.ts
tests/
  eventController.test.ts
  eventService.test.ts
```

---

### 🧠 Tips for Good Testing

* Test **only one thing** at a time
* Use meaningful test names
* Start simple (happy paths), then cover edge cases
* Mock slow or external parts (like file system or database)
* Run tests often!

---


