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
//let queryURL be declared into block scope and search open weather api, location, and use my APIkey for permission
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&appid=" + APIkey;
    axios.get(queryURL)
    .then(function(response){
        console.log(response);
        //Parse response to display the current conditions for the locations that has been searched
        const currentDate = new Date(response.data.dt*1000);
            console.log(currentDate);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
//let weatherPic be declared into block scope and append the HTML with data from openweathermap API including temp, humidity, wind-speed, etc"
            let weatherPic = response.data.weather[0].icon;
            currentPicE1.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicE1.setAttribute("alt",response.data.weather[0].description);
            currentTempE1.innerHTML = "Temperature: " + k2f(response.data.main.temp) + "&#176F"
            currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
//let latitude, longitude be declared into block scope. let UVQueryURL be declared into block scopre and display UV-index and danger index
            let lat = response.data.coord.lat;
            let lon = response.data.coord.lon;
            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            axios.get(UVQueryURL)
        .then(function(response){
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.data[0].value;
            currentUVEl.innerHTML = "UV Index: ";
            currentUVEl.append(UVIndex);
    });
//let locationID be declared into block scope and used saved location name to fetch 5-day forcecast
    let locationID = response.data.id;
        let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
        axios.get(forecastQueryURL)
        .then(function(response){
            console.log(response);
            //enter the constant forecast into block scope that fetches and displays 5-day forecast 
            const forecastEls = document.querySelectorAll(".forecast");
            //for loop to display forecast data from openweather API server
            for (i=0; i<forecastEls.length; i++) {
                //append the innerHTML document with the following forecast data
                forecastEls[i].innerHTML = "";
                //enter constants into block scope for forecasat data from openweather API server
                const forecastIndex = i*8 + 4;
                const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateEl = document.createElement("p");
                //set attributes to forecastDateE1 and append innerHTML document 
                forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear; //appended inner HTML to display these constants
                forecastEls[i].append(forecastDateEl);
                //entering a constant into block scope to display image of weather in forecast
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
                //append the forecast weather with temperature data 
                forecastEls[i].append(forecastWeatherEl);
                const forecastTempEl = document.createElement("p"); //entering a constant into block scope that appends HTML to display forecast temp
                forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                //append the forecast weather with humidity data 
                forecastEls[i].append(forecastTempEl);
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                forecastEls[i].append(forecastHumidityEl);
                }
            })
        });
    }

//creating and event lister for the search function and storing it's data into LocalStorage

searchE1.addEventListener("click", funciton() {
    //entering a constant into block scope for searchLocal and the input value
    const searchLocal = inputE1.value;
    getLocationWeather(searchLocal);
    //push input value from searchLocal to local storage
    searchHistory.push(searchLocal);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})