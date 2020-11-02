//declaring a function into global memory that will create a city list
function createCityList(citySearchList) {
    $("#city-list").empty(); //list will load empty upon document loading 
//declaring a variable for local memory that will take locations searched for and make them an object that will be stored as a list
    var keys = Object.keys(citySearchList);
    for (var i = 0; i < keys.length; i++) {
      var cityListEntry = $("<button>"); //declaring a variable for local memory for city list entry that functions as a button when clicked 
      cityListEntry.addClass("list-group-item list-group-item-action");
    //declaring a variable for local memory that will lowercase the object entered into local memory 
      var splitStr = keys[i].toLowerCase().split(" ");
      //for loop to uppercase any location in the object array that may need it 
      for (var j = 0; j < splitStr.length; j++) {
        splitStr[j] =
          splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
      }
    //declaring a variable for local memory that displays the city's with proper capitalization 
      var titleCasedCity = splitStr.join(" ");
      cityListEntry.text(titleCasedCity);
    //apending the inner html document to list and city that is in the city-list stored in local storeage
      $("#city-list").append(cityListEntry);
    }
  }
//entering a function into global memory that will fetch the weather of searched location
function getLocationWeather(city, citySearchList) {
        createCityList(citySearchList);
        //entering a variable into block scope that quers the openweathermap API for the current weather conditions
        var queryURL =
          "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=d66159be26bc887a3527fc689ffc14e6&q=" +
          city;
        //entering a variable into block scope that querys the openweathermap API for the 5-day forecast
        var queryURL2 =
          "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=d66159be26bc887a3527fc689ffc14e6&q=" +
          city;
        //entering a vriable into blockscope for latitude of the searched location
        var latitude;
        //entering a vriable into blockscope for longitude of the searched location
        var longitude;
        //ajay fetch metho to "get" the weather for a location input that is stored in localStoreage
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        //once data is retrived store it in as an object called 'weather'
          .then(function(weather) {
        //Log the queryURL
        console.log(queryURL);
        //entering a variable into local memeory that caprutres the current conditions
        var currentMoment = moment();
        //enter a variable into local memory that will display the current city and month/date/year
        var displayMoment = $("<h3>");
        $("#city-name").empty();//city name will start empty and append HTML document with location data for search input
        $("#city-name").append(
        displayMoment.text("(" +currentMoment.format("M/D/YYYY") + ")") //display as M/D/YYYY"
      );
        //enter a variable into local memory that stores location and appends it to HTML document
        var cityName = $("<h3>").text(weather.name);
        $("#city-name").prepend(cityName);
        //enter a variable into local memory called weatherConditions that will display image of weather for given conditions of a location
        var weatherConditions = $("<img>");
        weatherConditions.attr(
        "src",
        "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
      );
        $("#current-icon").empty();//loads current-icon the page as empty at start
        $("#current-icon").append(weatherConditions);//appends current icon when location is entered
        $("#current-temp").text("Temperature: " + weather.main.temp + " °F");//display current temperature in fahrenheit
        $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");//display current humidity as a %
        $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");//display current wind-speed in MPH
    //latitude and longitude of location coordinates are stored in weather object
      latitude = weather.coord.lat;
      longitude = weather.coord.lon;
    //entering a variable into local memory that will query the openweather APIL to display the 5-day forcast of location
      var queryURL3 =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=d66159be26bc887a3527fc689ffc14e6&q=" +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;
    //fetch method that will que URL to 'get' forcast for given location
      $.ajax({
        url: queryURL3,
        method: "GET"
        //Once we 'get' the data, store all of the retrieved data inside of an object called "uvIndex"
      }).then(function(uvIndex) {
        // console.log(uvIndex);
        //entering a variable into local memory that will display the current UV Index and its danger level
        var uvIndexDisplay = $("<button>");
        uvIndexDisplay.addClass("btn btn-danger");
        //append the html document with the data stored in the object uvIndexDisplay
        $("#current-uv").text("UV Index: ");
        $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));
        // console.log(uvIndex[0].value);
        //fetch method to 'get' data from url 'queryURL2' and store that as an object called "forecast"
        $.ajax({
            url: queryURL2,
            method: "GET"
            //Once we 'get' the data, store all of the retrieved data inside of an object called "forecast"
          }).then(function(forecast) {
            // console.log(queryURL2);
            // console.log(forecast);
            //for Loop through the forecast list array and display a single forecast entry/time (5th entry of each day which is close to the highest temp/time of the day) from each of the 5 days
            for (var i = 6; i < forecast.list.length; i += 8) {
              //entering a variable into local memory for the forecast date to display as <h5>
              var forecastDate = $("<h5>"); 
            //declaring a variable for local memory that positions the forecast with only 5 day's displayed
              var forecastPosition = (i + 2) / 8;
                //   console.log("#forecast-date" + forecastPosition);
                $("#forecast-date" + forecastPosition).empty();
                $("#forecast-date" + forecastPosition).append(
                forecastDate.text(currentMoment.add(1, "days").format("M/D/YYYY"))
            );
              var forecastDisplay = $("<img>");//declaring a variable for local memory to display the forecast icon
              forecastDisplay.attr(
                "src",
                "https://openweathermap.org/img/w/" + //getting the img from the openweathermap API server
                  forecast.list[i].weather[0].icon + //adding img to forecast entered into the forecast array
                  ".png"
              );
            //forecast icon will load empty and be appended as locations are entered
              $("#forecast-icon" + forecastPosition).empty();
              $("#forecast-icon" + forecastPosition).append(forecastDisplay);
            //   console.log(forecast.list[i].weather[0].icon);
            
            //append html document with the forecast temperature and display in fahrenheit 
              $("#forecast-temp" + forecastPosition).text(
                "Temp: " + forecast.list[i].main.temp + " °F"
              );
            //append html document with the forecast humidity and display in %
              $("#forecast-humidity" + forecastPosition).text(
                "Humidity: " + forecast.list[i].main.humidity + "%"
              );
            //appending the html document to style the forecast background color and data color
              $(".forecast").attr(
                "style",
                "background-color:dodgerblue; color:white"
              );
            }
          });
        });
      });
  }
//the funciton will not run until all of the elements on the HTML document have loaded
$(document).ready(function() {
//declaring a variable for local memory that takes city seach list and stores it in local memory
    var citySearchListStringified = localStorage.getItem("citySearchList");
//declaring a variable for local memory that takes the citySearchList and parses the data 
    var citySearchList = JSON.parse(citySearchListStringified);
//if city search list is equal to null load what is in the city searh list function
    if (citySearchList == null) {
      citySearchList = {};
    }

    createCityList(citySearchList);
    //appending the html document to hide the current and forecast weather when document is loaded 
    $("#current-weather").hide();
    $("#forecast-weather").hide();
    //appending the inner html document with an eventer listener for the search button
  $("#search-button").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-input")
      .val()
      .trim()
      .toLowerCase();
    //if city input is empty, check local storage for saved city searches 
    if (city != "") {
      
    citySearchList[city] = true;
    localStorage.setItem("citySearchList", JSON.stringify(citySearchList));

    getLocationWeather(city, citySearchList);
    //append the inner html document to show the current and future conditions for any locations saved in local storage
    $("#current-weather").show();
    $("#forecast-weather").show();
    }

    
  });
  //creating and event listener funciton for the location list to bring up conditions of past saved location 
  $("#city-list").on("click", "button", function(event) {
    event.preventDefault();
    var city = $(this).text();

    getLocationWeather(city, citySearchList);
    //appending the inner HTML to show the current weather and forecast weather of locations stored in local storeage 
    $("#current-weather").show();
    $("#forecast-weather").show();
  });
});