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
          // Store all of the retrieved data inside of an object called "weather"
          .then(function(weather) {
            // Log the queryURL
            console.log(queryURL);
         