// Updating the Race Time 
const updateRaceTime = (raceTime) => {
    const raceTimeElement = document.querySelector('.timer time');
    raceTimeElement.textContent = raceTime;

    // Format and display the race time
    const formattedRaceTime = `${raceTime.hours.toString().padStart(2, '0')}:${raceTime.minutes.toString().padStart(2, '0')}`;
    raceTimeElement.textContent = formattedRaceTime;

};
