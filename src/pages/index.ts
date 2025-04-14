import path from 'path';
import fs from 'fs';
import http from 'http';

interface NavBar {
    href: string,
    title: string,
}

let navBars : NavBar[] = [
    {href: "/", title: "Go Pal"},
    {href: "/about", title: "About"},
    {href: "/contact", title: "Contact"},
    {href: "/services", title: "Services"},
    {href: "/random", title: "Random Quotes"},
]

let navBarLines :string = navBars.map(i => `<a href=${i.href}>${i.title}</a>`).join("\n");
export function generatePageContent(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../templates', 'index.html');
        
        fs.readFile(filePath, 'utf-8', (err, staticContent) => {
            if (err) {
                console.error("Error reading file:", err);
                reject("Failed to load the page.");
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

            staticContent = staticContent.replace('</head>', style).replace('<!--NavBarPlaceholder-->',navBarLines);
            const currentDate: string = new Date().toLocaleString();
            resolve(staticContent + `<p>Current Date & Time: ${currentDate}.</p>`);
        });
    });
}