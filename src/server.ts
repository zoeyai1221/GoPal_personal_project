import http from 'http';
import { generatePageContent as indexContent } from './pages';

const PORT = 4000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        indexContent(req, (content) => {
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