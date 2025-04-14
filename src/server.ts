import http from 'http';
import { generatePageContent as indexContent } from './pages/index';
import { generatePageContent as aboutContent } from './pages/about';
import { generatePageContent as contactContent } from './pages/contact';
import { generatePageContent as servicesContent } from './pages/services';
import { generatePageContent as randomContent } from './pages/random';

const PORT = 4000;

// Map<url, pagecontent>

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.url === "/") {
        indexContent(req, (content) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(content); // needs to use res.end to return content to the server
        });
    } else if (req.url === "/about") {
        aboutContent(req, (content) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(content); // needs to use res.end to return content to the server
        });
    } else if (req.url === "/contact") {
        contactContent(req, (content) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(content); // needs to use res.end to return content to the server
        });
    } else if (req.url === "/services") {
        servicesContent(req, (content) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(content); // needs to use res.end to return content to the server
        });
    } else if (req.url === "/random") {
        randomContent(req, (content) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(content); // needs to use res.end to return content to the server
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});