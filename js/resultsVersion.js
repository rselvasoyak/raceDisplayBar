// Define app namespace
const raceDisplayApp = {};

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
        const racerData = json.raceInfo.drivers;
        updateResultsContainerBorder(status);
        updateTableData(racerData);
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

// Calling the init function for the tvVersion page
raceDisplayApp.initResultsVersion();