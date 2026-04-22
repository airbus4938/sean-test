
const numbersContainer = document.querySelector('.numbers');
const generateBtn = document.getElementById('generate');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme Toggle Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateToggleIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
    updateToggleIcon();
});

function updateToggleIcon() {
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Generate Numbers Logic
generateBtn.addEventListener('click', () => {
    generateNumbers();
});

function generateNumbers() {
    // Clear previous numbers
    numbersContainer.innerHTML = '';

    // Generate 6 unique random numbers
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    // Display numbers
    for (let i = 0; i < 6; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        if (i === 5) {
            numberDiv.classList.add('bonus');
        }
        numberDiv.textContent = sortedNumbers[i];
        numbersContainer.appendChild(numberDiv);
    }
}
