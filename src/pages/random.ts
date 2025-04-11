document.addEventListener('DOMContentLoaded', function() {
    console.log('random.js loaded successfully!');

    const quotes: string[] = [
        'Keep pushing forward!',
        'Code is like humor. When you have to explain it, it’s bad.',
        'Fix the cause, not the symptom.',
        'Optimism is an occupational hazard of programming.'
    ];
    const randomQuote: string = quotes[Math.floor(Math.random() * quotes.length)];

    const placeholderParagraph = document.querySelector('p');
    // Style it
    if (placeholderParagraph) {
        placeholderParagraph.textContent = randomQuote;
        placeholderParagraph.style.fontStyle = 'italic';
        placeholderParagraph.style.color = '#db7093';
    }

    // Add a button
    const button = document.createElement('button');
    button.textContent = 'Generate a new one!';
    button.style.padding = '10px';
    button.style.margin = '20px 0';
    button.style.backgroundColor = '#db7093';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    
    button.addEventListener('click', function() {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        (placeholderParagraph)!.textContent = newQuote;
    });

    document.body.appendChild(button);
});
