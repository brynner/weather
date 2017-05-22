/* Weather Web App by Brynner Ferreira - brynner.net */

// Functions
function convertTemperatureFromKelvin(temperature) {
	
	// From Kelvin to Celcius
	var temperature_converted = temperature-273.15;
	
	return Math.round(temperature_converted);
}

function weekday(time) {
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var date = new Date(time*1000);
	var day = days[ date.getDay() ];
	return day;
}

// Vars
var api = {};
api.weatherKey = 'becd669840e62b2bc9662a25ac13e51d';
api.weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID='+api.weatherKey+'&q=';
api.weatherImgSrc = 'http://openweathermap.org/img/w/';

// Controller
function WeatherController ($scope, $http) {

	$scope.options = {
		height: 100, 
		responsive: true,
		maintainAspectRatio: false
	};

	// Weather Conditions
	$scope.conditions = {
		2: 'Baita tempestade! Fique em casa com a família.', // Tempestade
		3: 'Chuvinha boa pra refletir na vida.', // Chuvisco
		5: 'Uma boa hora pra ficar em casa assistindo Netflix :D', // Chuva
		6: 'Vamos fazer uns bonecos de neve? ;o>', // Neve
		7: 'Provavelmente hoje é o fim do mundo :O', // Apocalipse
		8: 'Uma bela hora pra ir dar uma volta :)' // Ensolarado
	};

	// Weather API
	var weather = function(city) {

		$http.get(api.weatherUrl+city)
		.then(function (result) {

			// Show result
			$scope.showWeather = true;
			
			$scope.data = result.data;

			// Current city
			$scope.chosenPlace = $scope.data.city.name;

			// Save the city
			localStorage.setItem('city', $scope.chosenPlace);

			// Details
			$scope.weatherNow = {};
			$scope.weatherNow.temperature = convertTemperatureFromKelvin($scope.data.list[0].temp.day);
			$scope.weatherNow.description = $scope.data.list[0].weather[0].description;
			$scope.weatherNow.tip = $scope.conditions[($scope.data.list[0].weather[0].id).toString().substring(0,1)];

			$scope.labels = [];
			$scope.variation = [];
			$scope.variation[0] = [];
			$scope.variation[1] = [];

			// Week
			for (i=0; i<5; i++){

				$scope.data.list[i].temp.max = convertTemperatureFromKelvin($scope.data.list[i].temp.max);
				$scope.data.list[i].temp.min = convertTemperatureFromKelvin($scope.data.list[i].temp.min);

				$scope.data.list[i].dt = weekday($scope.data.list[i].dt);
				$scope.data.list[i].weather[0].icon = api.weatherImgSrc+$scope.data.list[i].weather[0].icon+'.png';

				$scope.labels.push($scope.data.list[i].dt);
				$scope.variation[0].push($scope.data.list[i].temp.max);
				$scope.variation[1].push($scope.data.list[i].temp.min);
			}
			
			// Forecast (current day and next days)
			$scope.days = $scope.data.list;

			// Temperature variation
			$scope.series = [' Max', ' Min'];

		})
		.catch(function (result) {

			swal('Cidade não encontrada', '', 'error');

		});
	}

	// Save the default city
	if (!localStorage.getItem('city')) {
		localStorage.setItem('city', 'Blumenau');
	}

	// Get the city and call the weather forecast
	weather(localStorage.getItem('city'));
	$scope.chosenPlace = localStorage.getItem('city');

	// After choose a city on Google Place Autocomplete
	$scope.ctrlFn = function(city) {
		weather(city);
    }
}

// Directive
function googleplace() {
    return {
        require: 'ngModel',
        scope: { callbackFn: '&' },
        link: function(scope, element, attrs, model) {

            var options = {
				types: ['(cities)'],
				componentRestrictions: {country: 'br'}
            };

            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {

            	// Unfocus input after change the place
            	element[0].blur();

            	var place = scope.gPlace.getPlace();
                scope.callbackFn({city: place.name});
            });
        }
    };
}

// Fix file when minified
WeatherController.$inject = ['$scope', '$http'];

// Weather API
angular.module('Weather', ['chart.js'])
.controller('WeatherController', WeatherController)
.directive('googleplace', googleplace);