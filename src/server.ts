// server.ts
import http from 'http';
import fs from 'fs/promises';
import path from 'path';

// Define the port
const PORT: number = 4000;
// Reload files from disk every 10 minutes
const CACHE_EXPIRY = 10 * 60 * 10000; // 10mins = 600000ms

interface Page {
  navBarItem: NavBarItem,
  pageContent: string,
}

interface NavBarItem {
  href: string,
  title: string
}

// TASK:
// 1. Save Pages as HTML Files
// 2. Modify Server to Load Files in Memory

// Initiate the array to store pages attributes
const pagesToLoad = [
  { href: "/", title: "GoPal", filename: "index.html" },
  { href: "/about", title: "About", filename: "about.html" },
  { href: "/contact", title: "Contact", filename: "contact.html" },
  { href: "/random", title: "Random", filename: "random.html" },
  { href: "/services", title: "Services", filename: "services.html" },
];

// Initiate cache object
const pageMap = new Map<string, Page>();

// Load all the pages by reading from html files
async function loadPages(): Promise<Map<string, Page>> {
  // Initiate an empty new Map to store url/route and Page
  for (let page of pagesToLoad) {
    // extract file path like
    // __dirname = /Users/you/NodeProject | page.filename = "about.html"
    // /Users/you/NodeProject/pages/about.html
    const filePath = path.join(__dirname, 'pages', page.filename); 
    // read from html file and convert to utf8 string
    let content = await fs.readFile(filePath, 'utf-8');  // fs.readFile() is async; compared to fs.readFileSync 

    // set up the new Map with content
    pageMap.set(page.href, {
      navBarItem: { href: page.href, title: page.title},
      pageContent: content
    });
  }
  return pageMap;
};

// Render the page
function renderPage(page: Page, extraContent?: string): string {
  let content = page.pageContent + (extraContent ?? "");
  const navBar = pagesToLoad.map(item =>`<a href=${item.href}>${item.title}</a>`).join("\n");

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
          <!-- <a href="/">GoPal</a> -->
          ${navBar}
        </nav>
        ${content}
      </body>
      </html>
    `;
};

function handleRequest(pageMap: Map<string, Page>): http.RequestListener { 
  return (req,res) => {
    console.log(`${req.method} ${req.url}`);
    let page = pageMap.get(req.url ?? "/");
  
    // special handling for page of main
    if (req.url === "/" && page) {
      // Default route ("/") with dynamic date and time
      const currentDate: string = new Date().toLocaleString();
      res.writeHead(200, {'Content-Type': 'text.html'});
      res.end(renderPage(page,`<p>Current Date & Time: ${currentDate}</p>`));
      return;
    }

    // special handling for page of random
    if (req.url === "/random" && page) {
      const quotes: string[] = [
        'Keep pushing forward!',
        'Code is like humor. When you have to explain it, it’s bad.',
        'Fix the cause, not the symptom.',
        'Optimism is an occupational hazard of programming.'
      ];
      const randomQuote: string = quotes[Math.floor(Math.random() * quotes.length)];
      res.writeHead(200, {'Content-Type': 'text.html'});
      res.end(renderPage(page,`<p>${randomQuote}</p>`));
      return;
    }
    
    // general render handling
    if (page) {
      res.writeHead(200, {'Content-Type': 'text.html'});
      res.end(renderPage(page));
    } else {
      res.writeHead(404, {'Content-Type': 'text.html'});
      res.end(renderPage(
        {navBarItem: {href: req.url ?? "", title: "404 Not Found"},
          pageContent:""},
        `<h1>404 Not Found</h1><p>Sorry, the page you are looking for doesn't exist. Please try again!</p>`
      ));
    }
  }
}

async function main() {
  // call the function to load page
  let pageMap = await loadPages();
  console.log('Pages loaded into memory');

  // Simulate a cache expiry
  setInterval(async () => {
    try {
      pageMap = await loadPages();
      console.log("Page cache refreshed at", new Date().toLocaleTimeString);
    } catch (err) {
      console.error("Failed to refresh page cache:", err);
    }
  }, CACHE_EXPIRY);

  // Start the server
  let server = http.createServer(handleRequest(pageMap));
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  });
}

main().catch(console.error);
