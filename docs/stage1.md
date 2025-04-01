Below is the updated Stage 1 study guide. In this version, the demo implementation remains a simple web app without a navigation bar. Your assignment is to enhance the project by building a simple navigation bar that lets users navigate between pages.

---

# **Stage 1: Basic Web App Setup, Backend Server Selection & TypeScript Introduction**

---

## **Part 1: Knowledge Base**

### **1. What Is a Server?**
- **Definition:**  
  A server is a computer or software application that listens for and responds to requests from clients (like your web browser). It serves up web pages, data, and other content when someone accesses your website.
- **Key Functions:**  
  - **Handling Requests:** Receives HTTP requests (e.g., GET, POST).  
  - **Processing Data:** Runs application logic, like retrieving or saving data.  
  - **Sending Responses:** Returns HTML, JSON, or other content back to the client.

### **2. Backend Server Options**
- **Node.js:**  
  - **What:** A JavaScript runtime built on Chrome’s V8 engine that lets you run JavaScript (or TypeScript) on the server.  
  - **Why:** Ideal if you want to use the same language on both the client and server; great for real-time apps and I/O-heavy tasks.
- **Python:**  
  - **What:** A language known for its simplicity and readability, often used with frameworks like Flask or Django.  
  - **Why:** Excellent for rapid prototyping and projects that benefit from Python’s rich set of libraries.
- **Java:**  
  - **What:** A robust, object-oriented language with mature frameworks like Spring.  
  - **Why:** Well-suited for enterprise-level applications that require strong type safety and scalability.
  
*Note: For this project, we’re selecting Node.js to build our naive web app.*

### **3. What Is TypeScript?**
- **Definition:**  
  TypeScript is a superset of JavaScript that adds static types. This means you can catch errors during development (at compile time) rather than at runtime.
- **Key Benefits:**  
  - **Type Safety:** Ensures variables and functions use consistent data types.
  - **Better Tooling:** Enhanced IDE support, including auto-completion and error detection.
  - **Scalability:** Makes large codebases more manageable by enforcing consistent coding patterns.
- **Why Use It:**  
  As your project grows, TypeScript will help keep your code reliable, understandable, and easier to refactor compared to plain JavaScript.

### **4. Changing the Server Port**
- **Concept:**  
  Sometimes you need to run your server on a different port (for example, if port 3000 is already in use).
- **Why It’s Important:**  
  Being able to change the port is a basic configuration skill essential for troubleshooting and running multiple services concurrently.

---

## **Part 2: Project Assignment Checkpoint**

### **Objective:**
Using Node.js with TypeScript, build a naive web app that displays a simple “Hello, World!” page, handles multiple routes, and allows you to change the server’s port. Then, as an extra assignment, build a simple navigation bar that links to each page.

### **Step-by-Step Guidelines for the Demo Implementation**

1. **Install Node.js:**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).
   - Verify the installation by running:
     ```bash
     node -v
     ```

2. **Set Up Your Project:**
   - Create a new folder for your project, e.g., `naive-web-app-ts`.
   - Open your terminal in this folder and run:
     ```bash
     npm init -y
     ```
     This creates a default `package.json`.

3. **Install TypeScript & Necessary Tools:**
   - Install TypeScript and Node.js types:
     ```bash
     npm install --save-dev typescript @types/node
     ```
   - Initialize a TypeScript configuration file:
     ```bash
     npx tsc --init
     ```
   - In your `tsconfig.json`, ensure `"target"` is set to `"ES6"` or later.

4. **Create Your TypeScript Server File:**
   - Create a file named `server.ts` in your project folder.
   - Paste the following code into `server.ts`:
     ```typescript
     // server.ts
     import http from 'http';

     // Define the port (you can change this later)
     const PORT: number = 3000;

     // Create a server that listens for HTTP requests
     const server = http.createServer((req, res) => {
       console.log(`${req.method} ${req.url}`);

       // Set response header for HTML content
       res.writeHead(200, { 'Content-Type': 'text/html' });

       if (req.url === '/about') {
         res.end(`
           <!DOCTYPE html>
           <html>
           <head>
             <title>About</title>
           </head>
           <body>
             <h1>About Us</h1>
             <p>This is a simple Node.js web app example using TypeScript.</p>
           </body>
           </html>
         `);
       } else if (req.url === '/contact') {
         res.end(`
           <!DOCTYPE html>
           <html>
           <head>
             <title>Contact</title>
           </head>
           <body>
             <h1>Contact Us</h1>
             <p>Email: contact@example.com</p>
           </body>
           </html>
         `);
       } else if (req.url === '/random') {
         // Random quote functionality
         const quotes: string[] = [
           'Keep pushing forward!',
           'Code is like humor. When you have to explain it, it’s bad.',
           'Fix the cause, not the symptom.',
           'Optimism is an occupational hazard of programming.'
         ];
         const randomQuote: string = quotes[Math.floor(Math.random() * quotes.length)];
         res.end(`
           <!DOCTYPE html>
           <html>
           <head>
             <title>Random Quote</title>
           </head>
           <body>
             <h1>Random Inspirational Quote</h1>
             <p>${randomQuote}</p>
           </body>
           </html>
         `);
       } else {
         // Default route ("/") with dynamic date and time
         const currentDate: string = new Date().toLocaleString();
         res.end(`
           <!DOCTYPE html>
           <html>
           <head>
             <title>Naive Web App</title>
           </head>
           <body>
             <h1>Hello, World!</h1>
             <p>Welcome to your naive Node.js web app built with TypeScript.</p>
             <p>Current Date & Time: ${currentDate}</p>
           </body>
           </html>
         `);
       }
     });

     // Start the server
     server.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
     });
     ```
   - **Explanation:**  
     - The server listens on port 3000 (this can be changed later).
     - Different routes (`/about`, `/contact`, `/random`, and the default `/`) return simple HTML pages.
     - The `/random` route provides a random inspirational quote.

5. **Compile TypeScript to JavaScript:**
   - Run the TypeScript compiler:
     ```bash
     npx tsc
     ```
   - This will generate a `server.js` file from your `server.ts`.

6. **Run Your Server:**
   - Start the server using Node.js:
     ```bash
     node server.js
     ```
   - Open your browser and navigate to:
     - [http://localhost:3000](http://localhost:3000) for the default page.
     - [http://localhost:3000/about](http://localhost:3000/about) for the About page.
     - [http://localhost:3000/contact](http://localhost:3000/contact) for the Contact page.
     - [http://localhost:3000/random](http://localhost:3000/random) for a random quote.

7. **Task: Change the Port**
   - **Assignment:**  
     Modify the `PORT` constant in your `server.ts` file to a different number (e.g., 4000).
   - Recompile TypeScript with:
     ```bash
     npx tsc
     ```
   - Restart your server and verify it by visiting [http://localhost:4000](http://localhost:4000).

8. **Extra Assignment: Build a Simple Navigation Bar**
   - **Your Task:**  
     Enhance the project by building a navigation bar for your web pages.  
     - **Requirements:**
       - The navigation bar should include links to Home, About, Contact, and Random Quote.
       - It should be styled with CSS (e.g., spacing, colors) for clarity.
       - The navigation bar should be visible on every page.
     - **Tips:**
       - You might create a helper function (similar to the demo's approach) to wrap your HTML content in a template that includes the navigation bar.
       - Experiment with different CSS styles to make the navigation bar user-friendly.
     - **Challenge:**  
       Add an extra link (for example, a “Services” page) and implement the corresponding route with appropriate content.

---

## **Visual Aids & Illustrations:**

- **Flowchart:**  
  Create a flowchart that shows:  
  **Browser → HTTP Request → Node.js Server (TypeScript) → Route Handling → HTML Response → Browser.**

- **Comparison Table:**  
  Draw a table comparing Node.js with Python and Java, listing differences in language, performance, ecosystem, and ideal use cases.

- **Code Walkthrough Diagram:**  
  Use a diagram to visually represent how the code in `server.ts` processes different URL paths and returns corresponding HTML pages.

---

## **Summary**

In Stage 1, you’ve:
- Learned what a server is and reviewed backend server options (Node.js, Python, Java) with Node.js chosen for this project.
- Discovered the benefits of using TypeScript over plain JavaScript.
- Built a simple web server with multiple routes and dynamic content using Node.js and TypeScript.
- Practiced basic configuration changes by learning how to change the server’s port.
- Received an extra assignment to build a navigation bar that links to each page—enhancing user experience and reinforcing your understanding of HTML and CSS.

Follow these steps, complete the assignments, and use visual aids to reinforce your understanding. Enjoy your coding journey, and feel free to ask questions if you need help!