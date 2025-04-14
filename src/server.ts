// server.ts
import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import express from 'express';

// Define the port
const PORT: number = 4000;
// Reload files from disk every minute
const CACHE_EXPIRY = 1 * 60 * 10000; // 1 min = 600000ms

const app = express();

// Static content service
app.use(express.static(path.join(__dirname, 'templates')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'pages')));

interface Page {
  navBarItem: NavBarItem,
  // pageContent: string,
  pageContentGenerator: (req: http.IncomingMessage) => string
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
// const navBarItems: Map<string, string> = new Map(pagesToLoad.map(i => [i.href, i.title]));

// Load all the pages by reading from html files
async function loadPages(): Promise<Map<string, Page>> {
  console.log("Loading the page...");
  // Initiate an empty new Map to store url/route and Page
  for (let page of pagesToLoad) {
    // extract file path like
    // /Users/NodeProject/templates/ about.html
    const filePath = path.join(__dirname, 'templates', page.filename); 
    try {
      // read from html file and convert to utf8 string
      let content = await fs.readFile(filePath, 'utf-8');  // fs.readFile() is async; compared to fs.readFileSync 

      // set up the new Map with content
      pageMap.set(page.href, {
        navBarItem: { href: page.href, title: page.title},
        pageContentGenerator: () => content
      });
    } catch (err) {
      console.error(`Error loading page ${page.filename}:`, err);
    }
  }
  return pageMap;
};

// Render the page
function renderPage(page: Page, req:http.IncomingMessage,  extraContent?: string): string {
  let content = page.pageContentGenerator(req) + (extraContent ?? "");
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
    // Express handling the static files!
    const url = req.url ?? '/';
    if (url.match(/\.(js|css|png|jpg|jpeg|gif|ico)$/)) {
      return app(req, res);
    }

    let page = pageMap.get(url);
  
    // main page (optional, just to show the diff vs. render the time in the server)
    if (req.url === "/" && page) {
      const currentDate: string = new Date().toLocaleString();
      const extraContent = `<p>Server-Side Time: ${currentDate}</p>`;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(renderPage(page, req, extraContent));
      return;
    }

    // general render handling
    if (page) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(renderPage(page,req));
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end(renderPage(
        {navBarItem: {href: req.url ?? "", title: "404 Not Found"},
          pageContentGenerator : ()=> ""}, req,
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
      console.log("Page cache refreshed at", new Date().toLocaleString());
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
