import http from 'http';

export function pageContentGenerator(req: http.IncomingMessage): string {
    const currentTime = new Date().toLocaleString();
    return `<p>Current Date & Time: ${currentTime}</p>`
}

// console.log(pageContentGenerator);