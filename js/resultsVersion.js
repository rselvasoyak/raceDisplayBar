// Define app namespace
const raceDisplayApp = {};

// OpenWeatherMap API key 
const apiKey = '41ccd155c8cc679e660102df8b4b5bed';

// Defining the init function for the tvVersion page
raceDisplayApp.initResultsVersion = () => {
    fetchData(); 
};

// Fetching mockJSON data and update border color
const fetchData = () => {
    fetch('./js/mockJSON.json')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        
        const status = json.raceInfo.status;
        updateResultsContainerBorder(status);

        const racerData = json.raceInfo.drivers;
        updateTableData(racerData);

        const location = json.raceInfo.location;
        fetchWeatherData(location);
    });
};

// Updating the border color of resultsContainer based on the race status
const updateResultsContainerBorder = status => {
    const resultsContainer = document.querySelector('.resultsContainer');
    const topContainer = document.querySelector('.topContainer');

    if (status.checkeredFlag === true) {
        resultsContainer.style.borderColor = 'black';
        topContainer.style.backgroundColor = 'black'
    } else if (status.redFlag === true) {
        resultsContainer.style.borderColor = 'red';
        topContainer.style.backgroundColor = 'red'
    } else if (status.yellowFlag === true) {
        resultsContainer.style.borderColor = 'yellow';
        topContainer.style.backgroundColor = 'yellow'
    } else {
        resultsContainer.style.borderColor = 'green';
        topContainer.style.backgroundColor = 'green'
    }
};

// Updating the Race Data Display table 
const updateTableData = (racerData) => {
    console.log(racerData);
    const table = document.querySelector('table tbody');
    table.innerHTML = ''; // Clear existing table rows

    racerData.forEach((driver, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="mobileExtra">${index + 1}</td>
            <td class="mobileExtra">${index + 7}</td>
            <td>${driver.name}</td>
            <td>${driver.lap}</td>
            <td class="switch1 best data">${driver.currentTime}</td>
            <td class="switch2 data">${driver.gapToPrevious}</td>
            <td class="switch3 data">${driver.gapToLeader}</td>
            <td class="switch4 data">+${(index + 2).toFixed(3)}</td>
        `;
        table.appendChild(newRow);
    });
};

const fetchWeatherData = (location) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    fetch(weatherUrl)
    .then(response => response.json())
    .then(weatherData => {
        console.log(weatherData);
        
        const temperature = weatherData.main.temp;
        const weatherIcon = weatherData.weather[0].icon;
        updateWeatherInfo(temperature, weatherIcon);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
};

// Update weather information in the DOM
const updateWeatherInfo = (temperature, weatherIcon) => {
    const roundedTemperature = Math.round(temperature);
    const tempElement = document.querySelector('.temp');
    tempElement.innerHTML = `${roundedTemperature}°C <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">`;
};

// Calling the init function for the tvVersion page
raceDisplayApp.initResultsVersion();