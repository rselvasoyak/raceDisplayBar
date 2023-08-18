// Populate the additionalInfo span with gaps
const populateAdditionalInfo = (racerData) => {
    const additionalInfoElements = document.querySelectorAll('.additionalInfo');
    additionalInfoElements.forEach((element, index) => {
        const driver = racerData[index];
        const gapToLog = displayLeaderGap ? driver.gapToLeader : driver.gapToPrevious;
        const dataTypeToLog = displayLeaderGap ? "G" : "D"
        element.textContent = `${dataTypeToLog}:${gapToLog}`;
    });
}


// Updating the TV Table Data 
const updateTableData = async (racerData) => {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing table rows

    const promises = racerData.map(driver => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <img class="countryFlag" alt="${driver.countryName}" src="" />
                ${driver.shortName} - ${driver.racerNumber}
            </td>
            <td>${driver.lap}</td>
            <td>
                <div class="timeInfo">
                    <span class="racerTime">${driver.currentTime}</span>
                    <span class="additionalInfo">G:${driver.gapToLeader}</span>
                </div>
            </td>
        `;
        tableBody.appendChild(newRow);

        // Fetch the country flag and update the src attribute
        const countryFlagImg = newRow.querySelector('.countryFlag');
        return fetchFlag(driver.countryCode)
            .then(flagBlob => {
                if (flagBlob) {
                    const flagURL = URL.createObjectURL(flagBlob);
                    countryFlagImg.src = flagURL;
                }
            });
    });


    // Populate the additionalInfo span with gaps
    populateAdditionalInfo(racerData);
};
