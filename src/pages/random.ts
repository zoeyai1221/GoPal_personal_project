import path from 'path';
import fs from 'fs';
import http from 'http';
import { pageRender } from './pageRender';

export function generatePageContent(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../templates', 'contact.html');
        
        fs.readFile(filePath, 'utf-8', (err, staticContent) => {
            if (err) {
                console.error("Error reading file:", err);
                reject("Failed to load the page.");
                return;
            }

            staticContent = pageRender(staticContent);
            
            // Add dynamic content
            const quotes: string[] = [
                'Keep pushing forward!',
                'Code is like humor. When you have to explain it, it’s bad.',
                'Fix the cause, not the symptom.',
                'Optimism is an occupational hazard of programming.'
              ];
            const randomQuote: string = quotes[Math.floor(Math.random() * quotes.length)];

            resolve(staticContent + `<p>${randomQuote}</p>`);
        });
    });
}
