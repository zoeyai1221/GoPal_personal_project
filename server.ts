// server.ts
import http from 'http';
// Define the port
const PORT: number = 4000;

// TASK:
// 1. Add a helper method to wrap HTML content in a template
// 2. Add navigation bar
// 3. Add Services page
// 4. Refine with CSS

// Add interface and lamda function to generate page and navBars
interface Page {
  navBarItem: NavBarItem,
  pageContent: string
}
interface NavBarItem {
  href: string,
  title: string
}

let pages: Page[] = [
  {
    navBarItem: {href: "/", title: "GoPal"},
    pageContent: `<h1>Let's Go To Eat, Pal!</h1> \
    <p>Welcome to GoPal to explore your favorite restaurants with buddies!</p>`
  },
  {
    navBarItem: {href: "/about", title: "About"},
    pageContent: `<h1>About Us</h1>
            <p>This is a simple Node.js web app example using TypeScript!</p>`
  },
  {
    navBarItem: {href: "/contact", title: "Contact"},
    pageContent: `<h1>Contact Us</h1><p>Email: iMeat@gopal.com</p>`
  },
  {
    navBarItem: {href: "/random", title: "Random Quote"},
    pageContent:`<h1>Random Inspirational Quote</h1>` //special handling
  },
  {
    navBarItem: {href: "/services", title: "Services"},
    pageContent: `<h1>Our Services</h1><p>We provide blahblah services.</p>`
  }
]

let pageMap: Map<string,Page> = new Map(pages.map(page => [page.navBarItem.href, page]));

let navBarItems: NavBarItem[] = pages.map(page => page.navBarItem);
// let navBarItems: NavBarItem[] = [
//   {href: "/", title: "GoPal"},
//   {href: "/about", title: "About"},
//   {href: "/contact", title: "Contact"},
//   {href: "/random", title: "Random Quote"},
//   {href: "/services", title: "Services"},
// ]

let navBar = navBarItems.map(item => `<a href="${item.href}">${item.title}</a>`).join("\n");

function renderPage(page: Page, bodyContent?: string): string {
  let content = page.pageContent + (bodyContent ?? "");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${page.navBarItem.title}</title>
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

// Create function that listens for HTTP requests
function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  console.log(`${req.method} ${req.url}`);

  if (req.url === "/") {
    // Default route ("/") with dynamic date and time
    const currentDate: string = new Date().toLocaleString();
    let page = pageMap.get("/");
    if (page) {
      res.writeHead(200, {'Content-Type': 'text.html'});
      res.end(renderPage(page,`<p>Current Date & Time: ${currentDate}</p>`));
    } else {
      res.writeHead(404);
      res.end("404 Page Not Found");
    }
    return;
  }

  if (req.url === "/random") {
    const quotes: string[] = [
      'Keep pushing forward!',
      'Code is like humor. When you have to explain it, it’s bad.',
      'Fix the cause, not the symptom.',
      'Optimism is an occupational hazard of programming.'
    ];
    const randomQuote: string = quotes[Math.floor(Math.random() * quotes.length)];
    let page = pageMap.get("/random");
    if (page) {
      res.writeHead(200, {'Content-Type': 'text.html'});
      res.end(renderPage(page,`<p>${randomQuote}</p>`));
    } else {
      res.writeHead(404);
      res.end("404 Page Not Found");
    }
    return;
  }

  let page = pageMap.get(req.url ?? "/")
  if (page) {
    res.writeHead(200, {'Content-Type': 'text.html'});
    res.end(renderPage(page));
  } else {
    res.writeHead(404);
    res.end("404 Page Not Found");
  }
}

let server = http.createServer(handleRequest);
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
