var app = angular.module('app', ['ui.bootstrap']);

app.filter('phone', function() {
	return function(input) {
		input = input || '';
		var pieces = [input.slice(0, 3), input.slice(3, 6), input.slice(6)];
		return pieces.join('-');
	}
});

app.controller("test", ['$scope', '$http', function($scope, $http) {
	$scope.loadData = function() {
		console.log("Loading parish JSON data for Angular...");
		$scope.parishes = JSON.parse($('#parishes').text());
		console.log($scope.parishes);
	}
}]);

var map;
var geometry = JSON.parse($('#geometry').text());
var lat = geometry['latitude'];
var lng = geometry['longitude'];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: lat, lng: lng},
		zoom: 12
	});
}