"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const http_1 = __importDefault(require("http"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Define the port
const PORT = 4000;
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
// Load all the pages by reading from html files
function loadPages() {
    return __awaiter(this, void 0, void 0, function* () {
        // Initiate an empty new Map to store url/route and Page
        const pageMap = new Map();
        for (let page of pagesToLoad) {
            // extract file path like
            // __dirname = /Users/you/NodeProject | page.filename = "about.html"
            // /Users/you/NodeProject/pages/about.html
            const filePath = path_1.default.join(__dirname, 'pages', page.filename);
            let content = yield promises_1.default.readFile(filePath, 'utf-8'); // read from html file and convert to utf8 string
            // set up the new Map with content
            pageMap.set(page.href, {
                navBarItem: { href: page.href, title: page.title },
                pageContent: content
            });
        }
        return pageMap;
    });
}
;
// let pages: Page[] = [
//   {
//     navBarItem: {href: "/", title: "GoPal"},
//     pageContent: `<h1>Let's Go To Eat, Pal!</h1> \
//     <p>Welcome to GoPal to explore your favorite restaurants with buddies!</p>`
//   },
//   {
//     navBarItem: {href: "/about", title: "About"},
//     pageContent: `<h1>About Us</h1>
//             <p>This is a simple Node.js web app example using TypeScript!</p>`
//   },
//   {
//     navBarItem: {href: "/contact", title: "Contact"},
//     pageContent: `<h1>Contact Us</h1><p>Email: iMeat@gopal.com</p>`
//   },
//   {
//     navBarItem: {href: "/random", title: "Random Quote"},
//     pageContent:`<h1>Random Inspirational Quote</h1>` //special handling
//   },
//   {
//     navBarItem: {href: "/services", title: "Services"},
//     pageContent: `<h1>Our Services</h1><p>We provide blahblah services.</p>`
//   }
// ]
// let pageMap: Map<string,Page> = new Map(pages.map(page => [page.navBarItem.href, page]));
// let navBarItems: NavBarItem[] = pages.map(page => page.navBarItem);
// let navBarItems: NavBarItem[] = [
//   {href: "/", title: "GoPal"},
//   {href: "/about", title: "About"},
//   {href: "/contact", title: "Contact"},
//   {href: "/random", title: "Random Quote"},
//   {href: "/services", title: "Services"},
// ]
// let navBar = navBarItems.map(item => `<a href="${item.href}">${item.title}</a>`).join("\n");
// Render the page
function renderPage(page, extraContent) {
    let content = page.pageContent + (extraContent !== null && extraContent !== void 0 ? extraContent : "");
    const navBar = pagesToLoad.map(item => `<a href=${item.href}>${item.title}</a>`).join("\n");
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
}
;
function handleRequest(pageMap) {
    return (req, res) => {
        var _a, _b;
        console.log(`${req.method} ${req.url}`);
        let page = pageMap.get((_a = req.url) !== null && _a !== void 0 ? _a : "/");
        // special handling for page of main
        if (req.url === "/" && page) {
            // Default route ("/") with dynamic date and time
            const currentDate = new Date().toLocaleString();
            res.writeHead(200, { 'Content-Type': 'text.html' });
            res.end(renderPage(page, `<p>Current Date & Time: ${currentDate}</p>`));
            return;
        }
        // special handling for page of random
        if (req.url === "/random" && page) {
            const quotes = [
                'Keep pushing forward!',
                'Code is like humor. When you have to explain it, it’s bad.',
                'Fix the cause, not the symptom.',
                'Optimism is an occupational hazard of programming.'
            ];
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            res.writeHead(200, { 'Content-Type': 'text.html' });
            res.end(renderPage(page, `<p>${randomQuote}</p>`));
            return;
        }
        // general render handling
        if (page) {
            res.writeHead(200, { 'Content-Type': 'text.html' });
            res.end(renderPage(page));
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text.html' });
            res.end(renderPage({ navBarItem: { href: (_b = req.url) !== null && _b !== void 0 ? _b : "", title: "404 Not Found" },
                pageContent: "" }, `<h1>404 Not Found</h1><p>Sorry, the page you are looking for doesn't exist. Please try again!</p>`));
        }
    };
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // call the function to load page
        let pageMap = yield loadPages();
        let server = http_1.default.createServer(handleRequest(pageMap));
        // Start the server
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    });
}
main().catch(console.error);
// Create function that listens for HTTP requests
// function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
//   console.log(`${req.method} ${req.url}`);
//   if (req.url === "/" && page) {
//     // Default route ("/") with dynamic date and time
//     const currentDate: string = new Date().toLocaleString();
//     let page = pageMap.get("/");
//     if (page) {
//       res.writeHead(200, {'Content-Type': 'text.html'});
//       res.end(renderPage(page,`<p>Current Date & Time: ${currentDate}</p>`));
//     } else {
//       res.writeHead(404);
//       res.end("404 Page Not Found");
//     }
//     return;
//   }
//   if (req.url === "/random" && page) {
//     const quotes: string[] = [
//       'Keep pushing forward!',
//       'Code is like humor. When you have to explain it, it’s bad.',
//       'Fix the cause, not the symptom.',
//       'Optimism is an occupational hazard of programming.'
//     ];
//     const randomQuote: string = quotes[Math.floor(Math.random() * quotes.length)];
//     let page = pageMap.get("/random");
//     if (page) {
//       res.writeHead(200, {'Content-Type': 'text.html'});
//       res.end(renderPage(page,`<p>${randomQuote}</p>`));
//     } else {
//       res.writeHead(404);
//       res.end("404 Page Not Found");
//     }
//     return;
//   }
//   let page = pageMap.get(req.url ?? "/")
//   if (page) {
//     res.writeHead(200, {'Content-Type': 'text.html'});
//     res.end(renderPage(page));
//   } else {
//     res.writeHead(404);
//     res.end("404 Page Not Found");
//   }
// }
// let server = http.createServer(handleRequest);
// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
