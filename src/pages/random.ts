import path from 'path';
import fs from 'fs';
import http from 'http';

export function generatePageContent (req: http.IncomingMessage, callback: (content:string) => void) {
    const filePath = path.join(__dirname, '../templates', 'random.html')
    
    fs.readFile(filePath, 'utf-8', (err, staticContent) => {
        if (err) {
            console.error("Error reading file:", err);
            callback("Fail to load the page.");
            return;
        }

        const style = `
            <style>
            body { color: #f4a460; font-family: Arial, sans-serif; font-weight: 600; margin: 20px; }
            nav { background: #db7093; padding: 10px; text-align: center; }
            nav a { color: white; margin: 0 15px; text-decoration: none; font-family: "Winky Sans", sans-serif; }
            nav a:hover { text-decoration: underline; }
            </style>
            </head>
        `

        staticContent = staticContent.replace('</head>', style)

        const quotes: string[] = [
            'Keep pushing forward!',
            'Code is like humor. When you have to explain it, it’s bad.',
            'Fix the cause, not the symptom.',
            'Optimism is an occupational hazard of programming.'
          ];
        const randomQuote: string = quotes[Math.floor(Math.random() * quotes.length)];

        callback(staticContent + `<p>${randomQuote}</p>`)
    });
}