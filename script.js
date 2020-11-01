//function to create a location search list that will be stored into global memory
function locationSearch(locationSearchList) {
    $("#search-list").empty();//populate empty
//entering a variable into block scope creates a list that will store what locations are searched and store them as a list
    var keys = object.keys(locationSearchList);
    for (var i = 0; i < keys.length; i++){
        var locationEntry = $("<button>");
        locationEntry.addClass("list-group-item list-group-item-action");
//entering a variable into block scope that will split the string value to lowercase or uppercase
        var splitStr = keys[i].toLowerCase().split(" ");
        for (var j = 0; j < splitStr.lentgh; j++) {
            splitStr[j] =
            splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
        }
        //entering a variable into block scope that will add join searches to list that are capitalized
        var locationUppercase= splitStr.join(" ");
        locationEntry.text(titleCasedCity);
    //append the html document to display a search list for search locations
        $("#search-list").append(locationEntry);
    }
}
//entering a function into global memory that will fetch the weather of searched location
    function getLocationWeather(city, locationSearchList) {
        createSearchList(locationSearchList);
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
        $("#location-name").empty();//city name will start empty and append HTML document with location data for search input
        $("#location-name").append(
        displayMoment.text("(" +currentMoment.format("M/D/YYYY") + ")") //display as M/D/YYYY"
      );
    //enter a variable into local memory that stores location and appends it to HTML document
      var locationName = $("<h3>").text(weather.name);
      $("#location-name").prepend(locationName);
    //enter a variable into local memory called weatherConditions that will display image of weather for given conditions of a location
      var weatherConditions = $("<img>");
      weatherConditions.attr(
        "src",
        "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
      );
      $("#current-icon").empty();//loads current-icon the page as empty at start
      $("#current-icon").append(weatherConditions);//appends current icon when location is entered

      $("#current-temp").text("Temperature: " + weather.main.temp + " °F");//display current temperature in farenheight
      $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");//display current humidity as a %
      $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");//display current wind-speed in MPH
    //latitude and longitude of location coordinates are stored in weather object
      latitude = weather.coord.lat;
      longitude = weather.coord.lon;
    //entering a variable into local memory that will query the openweather APIL to display the 5-day forcast of location
      var queryURL3 =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;

      $.ajax({
        url: queryURL3,
        method: "GET"
        // Store all of the retrieved data inside of an object called "uvIndex"
      