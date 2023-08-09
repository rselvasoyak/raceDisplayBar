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
        updateResultsContainerBorder(status);
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

// Calling the init function for the tvVersion page
raceDisplayApp.initResultsVersion();