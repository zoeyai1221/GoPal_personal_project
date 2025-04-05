// server.ts
import http from 'http';
// Define the port (you can change this later)
const PORT: number = 4000;

// TASK:
// 1. Add a helper method to wrap HTML content in a template
// 2. Add navigation bar
// 3. Add Services page
// 4. Refine with CSS

// add interface and lamda function to generate navBars
interface NavBarItem {
  href: string,
  title: string
}
let navBarItems: NavBarItem[] = [
  {href: "/", title: "GoPal"},
  {href: "/about", title: "About"},
  {href: "/contact", title: "Contact"},
  {href: "/random", title: "Random Quote"},
  {href: "/services", title: "Services"},
]

let navBar = navBarItems.map(item => `<a href="${item.href}">${item.title}</a>`).join("\n")

const renderPage = (title: string, content: string): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          body { color: #f4a460; font-family: Arial, sans-serif; font-weight: 600; margin: 20px; }
          nav { background: #db7093; padding: 10px; text-align: center; }
          nav a { color: white; margin: 0 15px; text-decoration: none; font-family: "Winky Sans", sans-serif; }
          nav a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <nav>
          <!-- <a href="/">GoPal</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/random">Random Quote</a>
          <a href="/services">Services</a> -->
          ${navBar}
        </nav>
        ${content}
      </body>
      </html>
    `;
};

// Create a server that listens for HTTP requests
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  // Set response header for HTML content
  res.writeHead(200, { 'Content-Type': 'text/html' });
  if (req.url === '/about') {
    res.end(
        renderPage(
            'About',
            `<h1>About Us</h1>
            <p>This is a simple Node.js web app example using TypeScript!</p>`
        )
    );
  } else if (req.url === '/contact') {
    res.end(
        renderPage(
            'Contact',
            '<h1>Contact Us</h1><p>Email: iMeat@gopal.com</p>'
        )
    );
  } else if (req.url === '/random') {
    // Random quote functionality
    const quotes: string[] = [
      'Keep eating!',
      'Food is like humor. When you have to explain it, it’s bad.',
      'Fix the cause, not the symptom.',
      'Optimism is an occupational hazard of programming.'
    ];
    const randomQuote: string = quotes[Math.floor(Math.random() * quotes.length)];
    res.end(
        renderPage(
            'Random Quote',
            `<h1>Random Inspirational Quote</h1><p>${randomQuote}</p>`
        )
    );
  } else if (req.url === '/services') { // add services page
    res.end(
      renderPage(
        'Services',
        `<h1>Our Services</h1><p>We provide blahblah services.</p>`
      )
    );
  } else {
    // Default route ("/") with dynamic date and time
    const currentDate: string = new Date().toLocaleString();
    res.end(
        renderPage(
            'GoPal',
            `<h1>Let's Go To Eat, Pal!</h1>
            <p>Welcome to GoPal to explore your favorite restaurants with buddies!</p>
            <p>Current Date & Time: ${currentDate}</p>`
        )
    );
  }
});
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
