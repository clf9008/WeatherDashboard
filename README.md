# WeatherDashboard

A weather application that shows the current and future conditions for any city that is searched for in the input. The application will display current condition, future conditions, as well as the UV index. It will use the OpenWeather API and feature dynamically updated HTML and CSS. 

## Application Description

A user will enter a city into the search function (the city name or 'City, State',) then the application will speak with the servers at the OpenWeather API to get the current and future weather conditions. The application will display the temperature, humidity, UV index, and a dynamically rendered picture that shows the current weather conditions in real time (ie; Sunny and Clear, Thunderstorms, windy, etc.) Additionally, the application will display the forcast for the next 5 day's for the given city. 

The application will save all of the previously stored searches in local storage and will display these searches if the window is closed and opened again. To clear these searches, the will be a clear history button that allows the user to clear the local storage and dashboard if they'd like too. 

### Deployed Application

[Deployed Application Link](https://clf9008.github.io/WeatherDashboard/)


![Image of Weather Dashboard](https://github.com/clf9008/WeatherDashboard/blob/main/WeatherDashboardImg.jpg.png "Weather Dashboard")

#### Outside Resources Used

- [OpenWeather API](https://openweathermap.org/api)
- JavaScript
- Jquery
- CSS

##### Challenges and Oppurtunities for Improvement

There were challenges in ensuring the saved data in the local storerage displayed on the page, however, these issues have been cleared up. In future iterations, a card could be added above the weather display dashboard but below the header that shows a live image via webcam of the searched location. 
