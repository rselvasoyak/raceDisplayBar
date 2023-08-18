// Define app namespace
const raceDisplayApp = {};

// Defining the init function for the tvVersion page
raceDisplayApp.initTvVersion = () => {
    fetchData();
    setInterval(() => {
        fetchDataAndLogGaps();
    }, 5000);
};

// Calling the init function for the tvVersion page
raceDisplayApp.initTvVersion();

// Periodically Switching the Gap / Down Display on screen 
    // Log gaps to leader and previous
    let displayLeaderGap = true; 
    const logGaps = (racerData) => {
        console.log("Gap to Leader or Gap to Previous:");
        racerData.forEach((driver) => {
            const gapToLog = displayLeaderGap ? driver.gapToLeader : driver.gapToPrevious;
            console.log(`${driver.shortName} - Gap: ${gapToLog}`);
        });
        //  the flag for the next iteration
        displayLeaderGap = !displayLeaderGap;
    };


