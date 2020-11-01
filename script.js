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

cont APIkey = "14fd9df994adf232eec7280aaaedb3db"