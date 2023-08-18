// Proxy server URL
const proxyUrl = 'https://proxy.junocollege.com/';

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

// Function to fetch the country flag as a Blob
const fetchFlag = (countryCode) => {
    const flagIconsUrl = `${proxyUrl}https://flagsapi.com/${countryCode}/shiny/16.png`;
    return fetch(flagIconsUrl)
        .then(response => response.blob())
        .catch(error => {
            console.error(`Error fetching flag for ${countryCode}:`, error);
            return null;
        });
};