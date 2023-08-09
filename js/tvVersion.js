// Import mockJSON Data 
const fetchData = () => {
    fetch('./js/mockJSON.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
    });
}

fetchData();


// Border Color Update 