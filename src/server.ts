import http from 'http';
import { generatePageContent as indexContent } from './pages/index';
import { generatePageContent as aboutContent } from './pages/about';
import { generatePageContent as contactContent } from './pages/contact';
import { generatePageContent as servicesContent } from './pages/services';
import { generatePageContent as randomContent } from './pages/random';

const PORT = 4000;

// Map<url, pagecontent>
interface Page {
    route: string,
    pageContentGenerator: (req:http.IncomingMessage) => Promise<string>, 
}

let pages: Page[] = [
    {route: "/", pageContentGenerator: indexContent},
    {route: "/about", pageContentGenerator: aboutContent},
    {route: "/contact", pageContentGenerator: contactContent},
    {route: "/services", pageContentGenerator: servicesContent},
    {route: "/random", pageContentGenerator: randomContent},
]

const server = http.createServer(async(req, res) => {
    console.log(`${req.method} ${req.url}`);

    let pagesMap: Map<string,Page> = new Map(pages.map(page => [page.route,page]))
    let page = pagesMap.get(req.url ?? '/');

    if (page) {
        try {
            const content = await page.pageContentGenerator(req);
            res.writeHead(200, {'Content-Type': 'text.html'});
            res.end(content);
        } catch (error) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('<h1>Internal Server Error</h1>');
        }
    } else {
        res.writeHead(404);
        res.end("404 Page Not Found");
      }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});