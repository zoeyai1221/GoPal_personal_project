import path from 'path';
import fs from 'fs';
import http from 'http';
import { pageRender } from './pageRender';

export function generatePageContent(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../templates', 'services.html');
        
        fs.readFile(filePath, 'utf-8', (err, staticContent) => {
            if (err) {
                console.error("Error reading file:", err);
                reject("Failed to load the page.");
                return;
            }
            
            staticContent = pageRender(staticContent);
            resolve(staticContent);
        });
    });
}
