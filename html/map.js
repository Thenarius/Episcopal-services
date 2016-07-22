var app = angular.module('app', ['ui.bootstrap']);

app.filter('phone', function() {
	return function(input) {
		input = input || '';
		var pieces = [input.slice(0, 3), input.slice(3, 6), input.slice(6)];
		return pieces.join('-');
	}
});

app.controller("test", ['$scope', '$http', function($scope, $http) {
	$scope.parishes = '';

	$scope.loadData = function() {
		$http.get('/dioceses/olympia.json').then(function(data) {
			$scope.parishes = data.data.parishes;
			console.log($scope.parishes)
		})
	}
}]);

var map;
var geometry = JSON.parse($('#geometry').text());
var lat = geometry['lat'];
var lng = geometry['lng'];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: lat, lng: lng},
		zoom: 12
	});
}