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
