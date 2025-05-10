document.addEventListener('DOMContentLoaded', function() {
    console.log('index.js loaded successfully!'); // print out in the console only
    
    // Add time section
    const currentTime = new Date().toLocaleString();
    const timeElement = document.createElement('p');
    timeElement.textContent = `Current Date & Time: ${currentTime}`;
    document.body.appendChild(timeElement);
    
    // Add a button
    const button = document.createElement('button');
    button.textContent = 'refresh time';
    button.style.padding = '10px';
    button.style.margin = '10px 0';
    button.style.backgroundColor = '#db7093';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    
    button.addEventListener('click', function() {
        timeElement.textContent = `Current Date & Time: ${new Date().toLocaleString()}`;
    });
    
    document.body.appendChild(button);
});