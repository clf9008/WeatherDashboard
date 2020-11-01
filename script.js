//funciton to append HTML and declare into Global Memory constants of location input, search, history, etc.
function initPage() {
    const  inputE1 = document.getElementById("location-input");
    const  searchE1 = document.getElementById("location-search");
    const  clearE1 = document.getElementById("clear-location");
    const  nameE1 = document.getElementById("location-name");
    const  currentPicE1 = document.getElementById("location-pic");
    const  currentTempE1 = document.getElementById("temp");
    const  currentHumidtyE1 = document.getElementById("humidity");
    const  currentWindE1 = document.getElementById("wind-speed");
    const  currentUVIndexE1 = document.getElementById("UV-index");
    const  historyE1 = document.getElementById("history");
    let locationHistory = JSON.parse(localStorage.getItem("search")) || [];

    console.log(searchHistory);
}
//costant to declare into Global Memory the API Key for the Open Weather API server
const APIkey = "14fd9df994adf232eec7280aaaedb3db"

//funciton to get data from API server that has been searched for by the user
function getLocationWeather(locaitonName) {

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&appid=" + APIkey;
    axios.get(queryURL)
    .then(function(response){
        
        console.log(response);
        
    })
}