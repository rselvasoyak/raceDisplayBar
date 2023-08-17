// Define app namespace
const raceDisplayApp = {};

// OpenWeatherMap API key 
const apiKey = '41ccd155c8cc679e660102df8b4b5bed';

// Defining the init function for the tvVersion page
raceDisplayApp.initResultsVersion = () => {
    fetchData(); 
};

// // Declaring racerData on global cope for all functions 
let racerData;
let isGapToLeader = true; // To track the current display type

// When the hamburger Menu is clicked 
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const hamburgerIcon = document.querySelector(".hamburger-icon");

    hamburgerIcon.addEventListener("click", function() {
        hamburgerMenu.classList.toggle("menu-open");
    });
});

// Variable to track the current display type
let displayType = 'gapToLeader';
let displayLeaderGap = true;

// Fetching mockJSON data and update border color
const fetchData = () => {
    fetch('./js/mockJSON.json')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        
        const status = json.raceInfo.status;
        updateResultsContainerBorder(status);

        racerData = json.raceInfo.drivers;
        updateTableData(racerData);

        const location = json.raceInfo.location;
        fetchWeatherData(location);

        // Update the race time
        const raceTime = json.raceInfo.raceTime;
        updateRaceTime(raceTime);

        // Log the racerData before updating the table (only for smaller screens)
        const screenWidth = window.innerWidth;
        // Update the table with racerData (only for smaller screens)


        if (screenWidth <= 768) {
            updateTableData(racerData, isGapToLeader);

            setInterval(() => {
                console.clear(); // Clear the console
                console.log("Gap Data:");

                racerData.forEach(driver => {
                    const gapData = isGapToLeader ? driver.gapToLeader : driver.gapToPrevious;
                    console.log(`${driver.name}: ${gapData}`);
                });

                // Toggle between gapToLeader and gapToPrevious
                isGapToLeader = !isGapToLeader;

                // Update the displayed data in the DOM (only for smaller screens)
                updateTableData(racerData, isGapToLeader);
            }, 5000);
        }
    });
};

// Periodically updating the Gap/Down & Best/Last BELOW ... PX 
const toggleDataDisplay = (racerData) => {
    console.log(displayType)
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        const additionalInfoElements1 = document.querySelectorAll('.switch1');
        const additionalInfoElements3 = document.querySelectorAll('.switch4');

        additionalInfoElements1.forEach((element, index) => {
            const driver = racerData[index];
            let dataToToggle;

            // Determine which data to toggle based on displayType
            if (displayType === 'currentTime') {
                dataToToggle = driver.currentTime;
            } else if (displayType === 'gapToPrevious') {
                dataToToggle = driver.gapToPrevious;
            } else if (displayType === 'gapToLeader') {
                dataToToggle = driver.gapToLeader;
            }

            element.textContent = dataToToggle;
        });

        additionalInfoElements3.forEach((element, index) => {
            const driver = racerData[index];
            let dataToToggle;

            // Determine which data to toggle based on displayType
            if (displayType === 'currentTime') {
                dataToToggle = driver.currentTime;
            } else if (displayType === 'gapToPrevious') {
                dataToToggle = driver.gapToPrevious;
            } else if (displayType === 'gapToLeader') {
                dataToToggle = driver.gapToLeader;

                // Check if the value is below 3 seconds and change the background color
                if (parseFloat(dataToToggle) < 3.0) {
                    console.log("it is below 3 seconds")
                    element.style.backgroundColor = 'red'; 
                } else {
                    element.style.backgroundColor = 'inherit'; 
                }
            }

            element.textContent = `G: ${dataToToggle}`;
        });

        displayLeaderGap = !displayLeaderGap; 
    }
};

// Updating the border color of resultsContainer based on the race status
const updateResultsContainerBorder = status => {
    const resultsContainer = document.querySelector('.resultsContainer');
    const topContainer = document.querySelector('.topContainer');

    if (status.checkeredFlag === true) {
        resultsContainer.style.borderColor = 'transparent';
        resultsContainer.style.borderImageSource = 'url("../styles/sass/visuals/checkered.png")'
        resultsContainer.style.borderImageSlice = '400'

        topContainer.style.backgroundImage = 'url("../styles/sass/visuals/checkered.png")'
        topContainer.style.backgroundSize = 'repeat';
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
    table.innerHTML = ''; 

    racerData.forEach((driver, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="mobileExtra">${index + 1}</td>
            <td class="mobileExtra">${index + 7}</td>
            <td>${driver.name}</td>
            <td>${driver.lap}</td>
            <td class="switch1 best data">${driver.currentTime}</td>
            <td class="switch2 data">${driver.currentTime}</td>
            <td class="switch3 data">${driver.gapToPrevious}</td>
            <td class="switch4 data">${isGapToLeader ? driver.gapToLeader : driver.gapToPrevious}</td>
        `;

        // Check if the value is below 3 seconds and change the background color
        const gapDataCell = newRow.querySelector('.switch4');
        if (parseFloat(driver.gapToLeader) < 3.0) {
            console.log("it is below 3 seconds")
            gapDataCell.classList.add('metallicRedBg');
        }

        // Check if the currentTime is the closest to 0 and change background accordingly 
        const bestTimeCell = newRow.querySelector('.best');
        if (driver.bestLap) {
            bestTimeCell.classList.add('metallicGreenBg');
        }

        table.appendChild(newRow);
    });
};


// ${isGapToLeader ? driver.gapToLeader : driver.gapToPrevious}
// Updating the race time 
const updateRaceTime = (raceTime) => {
    const raceTimeElement = document.querySelector('.timer time');
    raceTimeElement.textContent = raceTime;

    // Format and display the race time
    const formattedRaceTime = `${raceTime.hours.toString().padStart(2, '0')}:${raceTime.minutes.toString().padStart(2, '0')}`;
    raceTimeElement.textContent = formattedRaceTime;
};

// Updating Weather Info 
    // Making Open Weather API Call 
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