// Add nav bar lines like <a href="/">title</a> on each page
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

// Apply css style on each page
const style = `
            <style>
            body { color: #f4a460; font-family: Arial, sans-serif; font-weight: 600; margin: 20px; }
            nav { background: #db7093; padding: 10px; text-align: center; }
            nav a { color: white; margin: 0 15px; text-decoration: none; font-family: "Winky Sans", sans-serif; }
            nav a:hover { text-decoration: underline; }
            </style>
            </head>
            `

// Render the page
export function pageRender(content:string) {
    if (content.includes(`<!--NavBarPlaceholder-->`)) {
        content = content.replace(`<!--NavBarPlaceholder-->`,navBarLines);
    }

    if (content.includes(`</head>`)) {
        content = content.replace(`</head>`, style);
    }   

    return content;
}
