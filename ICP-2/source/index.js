$(document).ready(function () {
    let options = {
        types: ['(cities)'],
        componentRestrictions: {country: "usa"}
    };
    let location = document.getElementById("location");
    // feature to add auto complete for input field using google maps API
    new google.maps.places.Autocomplete(location, options);
});

angular.module('weather', []).controller('weatherctrl', function ($scope, $http) {
    $scope.getWeather = function () {
        let location = document.getElementById("location").value;
        // filter location using regex to generate valid parameters for the API call
        let filtered_location = location.replace(/(.*)(, USA)/, '$1');
        let table = document.getElementById("weather-table");
        // API call using get method
        $http.get('http://api.wunderground.com/api/YOUR_API_KEY/hourly/q/' + filtered_location + '/.json').then(function (response) {
            for (let res = 0; res < 5; res++) {
                let weather_result = [];
                let icon_url = '<img src=' + response.data.hourly_forecast[res].icon_url + '>';
                weather_result.push(response.data.hourly_forecast[res].FCTTIME.pretty,
                    response.data.hourly_forecast[res].temp.english,
                    response.data.hourly_forecast[res].condition,
                    icon_url
                );
                // append rows to table
                let row = table.insertRow(res + 1);
                for (let col = 0; col < weather_result.length; col++) {
                    row.insertCell(col).innerHTML = weather_result[col];
                }
            }
        });
    }
});
