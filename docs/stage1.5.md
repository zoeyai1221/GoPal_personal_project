



### Stage 1.5: Advanced TypeScript & File System Interactions  

---

## 📚 Knowledge Base  

### 1.1 Understanding Promises and Asynchronous Programming  

#### 🔹 What is a Promise?  
A **Promise** is an object that represents a value that may be available now, in the future, or never. It allows asynchronous operations to be handled in a cleaner way than traditional callbacks.  

#### 🔹 What is Asynchronous Programming?  
- In synchronous code, each line executes **one after another**, blocking execution until the task is complete.  
- In asynchronous code, certain operations (like fetching data, reading files, or making network requests) **do not block execution**. The program moves on while waiting for the operation to finish.  

#### 🔹 How is this Different from Java’s `CompletableFuture`?  
- Java’s `CompletableFuture` is also a way to handle async tasks, but Java runs in a **multi-threaded** environment by default.  
- Node.js, on the other hand, uses a **single-threaded, event-driven (see below)** model where I/O operations (like reading a file) don’t block the entire process.  

#### 🔹 Using Promises in JavaScript (Old-School `then/catch`)  

```typescript
import fs from 'fs';

// Creating a promise to read a file asynchronously
const readFilePromise = new Promise<string>((resolve, reject) => {
  fs.readFile('example.txt', 'utf-8', (err, data) => {
    if (err) {
      reject('Failed to read file');
    } else {
      resolve(data);
    }
  });
});

// Handling the promise
readFilePromise
  .then((content) => console.log('File content:', content))
  .catch((error) => console.log('Error:', error));
```

💡 **Why use Promises?**  
- Avoids deeply nested callbacks (a.k.a. “callback hell”).  
- Makes async code more readable and maintainable. 

### 1.1.1 Event Driven Programming

#### 🔹 What is Event-Driven Programming?  
Event-driven programming is a paradigm where the flow of the program is determined by **events** such as user interactions, messages from other threads, or signals from the system. Instead of executing code sequentially, the program **waits for events** and reacts to them as they occur.  

Node.js is **event-driven**—it listens for events and executes corresponding event handlers **asynchronously**.  

#### 🔹 How Event-Driven Programming Works  
An event-driven program typically follows these steps:  

1. **Event Registration**: The program defines an event and its corresponding handler (callback function).  
2. **Event Listening**: The program continuously listens for events (e.g., user clicks, file changes, network requests).  
3. **Event Execution**: When an event occurs, the registered callback function executes asynchronously.  

**Example in Node.js:**  

```typescript
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

// Register an event
eventEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Trigger the event
eventEmitter.emit('greet', 'Alice');
```

💡 **How This Works:**  
- We create an `EventEmitter` instance.  
- We define an event (`'greet'`) and assign a callback.  
- We trigger the event using `emit()`, which calls the registered function.  

---

#### 🔹 Event-Driven Programming vs. Traditional Flow  

| **Feature** | **Event-Driven** | **Traditional (Procedural)** |
|------------|----------------|----------------|
| **Execution** | Reacts to events | Follows a strict flow |
| **Concurrency** | Handles multiple tasks asynchronously | One task at a time (blocking) |
| **Use Case** | Web servers, UI interactions | Scripts, batch jobs |
 

---

### 1.2 Understanding File Systems  

#### 🔹 Where is Data Stored?  
- **In Memory (RAM)**: Fast but temporary. If the program restarts, all data is lost.  
- **On Disk (File System)**: Slower but persistent. Data remains even after the program is closed (even restart laptop).  

#### 🔹 Why Use Files?  
- Storing configurations or user data without needing a database.  
- Keeping logs for debugging.  
- Caching frequently accessed data to improve performance.  

#### 🔹 Cache vs. File System vs. CDN  
| **Storage Type** | **Speed** | **Persistence** | **Use Case** |
|-----------------|----------|---------------|--------------|
| **In-Memory (Cache)** | ⚡ Very Fast | ❌ No | Temporary data, quick access |
| **File System (Disk)** | 🏃‍♂️ Fast | ✅ Yes | Local storage, logs, configuration |
| **CDN (Content Delivery Network)** | 🌍 Fast (distributed) | ✅ Yes | Optimized delivery of static assets like images & HTML |

💡 **Example**: Web browsers use caching to store assets like images so they don’t need to be downloaded again every visit.

---

### 1.3 How Node.js Manages Files  

#### 🔹 Working with Files in Node.js  
Node.js provides the `fs` module to handle file operations like reading, writing, and deleting files.  

**Common Methods in `fs` module:**  
| **Function** | **Purpose** |
|-------------|------------|
| `fs.readFile()` | Reads a file asynchronously |
| `fs.writeFile()` | Writes to a file asynchronously |
| `fs.appendFile()` | Adds content to an existing file |
| `fs.unlink()` | Deletes a file |

#### 🔹 Absolute vs. Relative Paths  
| **Path Type** | **Example** | **Explanation** |
|-------------|-------------|----------------|
| **Absolute Path** | `/Users/will/Documents/file.txt` | Full file path from the root of the system |
| **Relative Path** | `./data/file.txt` | Path relative to the current working directory |

💡 **On macOS**, user files are typically found under `/Users/<your-username>/`, and system files are stored under `/System/Library/`.

---

### 1.4 Storing Data Without a Database  

Sometimes, we don’t need a full database to store data. Instead, we can use **local files** as a lightweight alternative.

#### 🔹 Why Avoid a Database?  
- Databases **cost money** and require setup.  
- If the app is simple, writing data to a **local file** is enough.  

💡 **Example Use Case:**  
A blog application that stores posts in a file (`posts.json`) instead of using a database.

---

## 🛠️ Project Assignment Checkpoint  

---

### 🎯 Goal  
- Convert the HTML pages from **Stage 1** into separate `.html` files.  
- Load those files into memory asynchronously when the server starts.  
- Serve the pages from memory instead of reading them from disk on every request.  

💡 **Why Do This?**  
1. **Easier HTML Editing**: Instead of embedding HTML inside JavaScript, we can edit the HTML separately.  
2. **Decouples Rendering from Data Logic**: The server logic doesn’t need to read from the file system every request.  

---

### ✅ Step 1: Save Pages as HTML Files  

Move the hardcoded HTML content into separate files inside a new `pages/` directory.

📂 **Project Structure**  
```
activity-app/
├── src/
│   ├── pages/        # Store HTML files
│   │   ├── index.html
│   │   ├── about.html
│   │   ├── contact.html
│   ├── server.ts
├── package.json
└── tsconfig.json
```

**`src/pages/index.html`**  
```html
<!DOCTYPE html>
<html>
<head>
  <title>Home Page</title>
</head>
<body>
  <h1>Welcome to the Home Page</h1>
</body>
</html>
```

---

### ✅ Step 2: Modify Server to Load Files in Memory  

Instead of reading files on every request, we **load them once** when the server starts.

**`src/server.ts`**  
```typescript
import express, { Request, Response } from 'express';
import fs from 'fs/promises'; // Use the promise-based version of fs

const app = express();
const PORT = 3000;

let pagesCache: Record<string, string> = {};

// Load HTML files into memory when the server starts
const loadPages = () => {
  return Promise.all([
    fs.readFile('./src/pages/index.html', 'utf-8').then(content => pagesCache['/'] = content),
    fs.readFile('./src/pages/about.html', 'utf-8').then(content => pagesCache['/about'] = content),
    fs.readFile('./src/pages/contact.html', 'utf-8').then(content => pagesCache['/contact'] = content),
  ]);
};

loadPages()
  .then(() => {
    console.log('Pages loaded into memory');
    
    // Serve the pages from memory
    app.get('*', (req: Request, res: Response) => {
      const path = req.path;
      if (pagesCache[path]) {
        res.send(pagesCache[path]);
      } else {
        res.status(404).send('Page Not Found');
      }
    });

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.log('Error loading pages:', err));
```

---

### 🎯 Assignment: Your Tasks  

1️⃣ **Create Additional Pages**  
- Add `services.html` and `team.html` inside `pages/`.  
- Modify `server.ts` to load these new pages into memory.  

2️⃣ **Modify File Loading**  
- Instead of hardcoding paths, **dynamically load all `.html` files** inside `pages/` directory.  

3️⃣ **Simulate a Cache Expiry**  
- Modify the server to **reload files from disk every 10 minutes** (simulating cache expiration).  

4️⃣ **Nav bar extraction**
- Right now, each HTML file has a duplicate navigation bar like this:
```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```
- If you want to change the navigation (e.g., add a new link), you have to edit every file manually.
- Extract the Navigation Bar. Move the `<nav>` section into a separate file called nav.html.

---

### 💡 Pro Tips  
- Research how **file caching** improves performance.  
- Look into **CDNs** (Content Delivery Networks) to understand how big websites manage static files.  

🚀 **Now go implement your first server-side caching mechanism!**





