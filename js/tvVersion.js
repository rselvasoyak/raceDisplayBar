// Define app namespace
const raceDisplayApp = {};

// Defining the init function for the tvVersion page
raceDisplayApp.initTvVersion = () => {
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
        updateMainFrameBorder(status);
        updateTableData(racerData);
    });
};

// Updating the border color based on the race status
const updateMainFrameBorder = status => {
    const mainFrame = document.querySelector('.mainFrame');

    if (status.checkeredFlag === true) {
        mainFrame.style.borderColor = 'black';
    } else if (status.redFlag === true) {
        mainFrame.style.borderColor = 'red';
    } else if (status.yellowFlag === true) {
        mainFrame.style.borderColor = 'yellow';
    } else {
        mainFrame.style.borderColor = 'green';
    }
};

// Updating the TV Table Data 
const updateTableData = (racerData) => {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing table rows

    racerData.forEach((driver) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${driver.shortName}</td>
            <td>${driver.lap}</td>
            <td>
                <div class="timeInfo">
                    <span class="racerTime">${driver.currentTime}</span>
                    <span class="additionalInfo">G:${driver.gapToLeader}</span>
                </div>
            </td>
        `;
        tableBody.appendChild(newRow);
    });
};

// Calling the init function for the tvVersion page
raceDisplayApp.initTvVersion();

