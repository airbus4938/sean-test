
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

// iQAir Weather API Logic
const API_KEY = '383547b9-9812-4356-8c09-67d32c6e46d9';
const weatherContainer = document.getElementById('weather-container');

async function fetchWeather() {
    try {
        const response = await fetch(`https://api.airvisual.com/v2/nearest_city?key=${API_KEY}`);
        const data = await response.json();

        if (data.status === 'success') {
            displayWeather(data.data);
        } else {
            weatherContainer.innerHTML = '<p>Weather data unavailable</p>';
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherContainer.innerHTML = '<p>Error loading weather</p>';
    }
}

function displayWeather(data) {
    const city = data.city;
    const temp = data.current.weather.tp;
    const aqi = data.current.pollution.aqius;
    const icon = data.current.weather.ic;

    weatherContainer.innerHTML = `
        <div class="weather-info">
            <img src="https://www.airvisual.com/images/${icon}.png" alt="weather icon" width="40">
            <span class="weather-temp">${temp}°C</span>
            <span class="weather-aqi">AQI: ${aqi}</span>
        </div>
        <div class="weather-city">${city}</div>
    `;
}

fetchWeather();

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
