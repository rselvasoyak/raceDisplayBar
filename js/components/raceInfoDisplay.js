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
