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
        updateMainFrameBorder(status);
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

// Calling the init function for the tvVersion page
raceDisplayApp.initTvVersion();

