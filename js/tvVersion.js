// Define app namespace
const raceDisplayApp = {};

// Fetching mockJSON data and update border color
const fetchData = () => {
    fetch('./js/mockJSON.json')
        .then(response => response.json())
        .then(json => {
            console.log(json);

            const status = json.raceInfo.status;
            updateMainFrameBorder(status);

            const racerData = json.raceInfo.drivers;

            
            // Update the TV Table Data
            updateTableData(racerData);


            // Periodically switch Gap/Down display
            setInterval(() => {
                populateAdditionalInfo(racerData);
            }, 5000);

            // Update the race time
            const raceTime = json.raceInfo.raceTime;
            updateRaceTime(raceTime);

            const raceName = json.raceInfo.raceName;
            updateRaceName(raceName);
        });
};

// Periodically Switching the Gap / Down Display on screen
const fetchDataAndLogGaps = () => {
    fetch('./js/mockJSON.json')
        .then(response => response.json())
        .then(json => {
            const racerData = json.raceInfo.drivers;
            logGaps(racerData);
        });
};

// Periodically Switching the Gap / Down Display on screen 
// Log gaps to leader and previous
let displayLeaderGap = true; // Start with leader gap
const logGaps = (racerData) => {
    console.log("Gap to Leader or Gap to Previous:");
    racerData.forEach((driver) => {
        const gapToLog = displayLeaderGap ? driver.gapToLeader : driver.gapToPrevious;
        console.log(`${driver.shortName} - Gap: ${gapToLog}`);
    });
    // Toggle the flag for the next iteration
    displayLeaderGap = !displayLeaderGap;
};
// Populate the additionalInfo span with gaps
const populateAdditionalInfo = (racerData) => {
    const additionalInfoElements = document.querySelectorAll('.additionalInfo');
    additionalInfoElements.forEach((element, index) => {
        const driver = racerData[index];
        const gapToLog = displayLeaderGap ? driver.gapToLeader : driver.gapToPrevious;
        element.textContent = `G: ${gapToLog}`;
    });
}

// Updating the Race Name 
const updateRaceName = (raceName) => {
    const h1Element = document.querySelector('.timer p');
    h1Element.textContent = raceName;
};

// Updating the border color based on the race status
const updateMainFrameBorder = status => {
    const mainFrame = document.querySelector('.mainFrame');

    if (status.checkeredFlag === true) {
        mainFrame.style.borderColor = 'transparent';
        mainFrame.style.borderImageSource = 'url("../styles/sass/visuals/checkered.png")'
        mainFrame.style.borderImageSlice = '400'
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
            <td>${driver.shortName} - ${driver.racerNumber}</td>
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

    // Populate the additionalInfo span with gaps
    populateAdditionalInfo(racerData);
};

// Updating the Race Time 
const updateRaceTime = (raceTime) => {
    const raceTimeElement = document.querySelector('.timer time');
    raceTimeElement.textContent = raceTime;

    // Format and display the race time
    const formattedRaceTime = `${raceTime.hours.toString().padStart(2, '0')}:${raceTime.minutes.toString().padStart(2, '0')}`;
    raceTimeElement.textContent = formattedRaceTime;

};

// Defining the init function for the tvVersion page
raceDisplayApp.initTvVersion = () => {
    fetchData();
    setInterval(() => {
        fetchDataAndLogGaps();
    }, 5000);
};

// Calling the init function for the tvVersion page
raceDisplayApp.initTvVersion();

