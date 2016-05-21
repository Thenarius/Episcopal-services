var app = angular.module('app', []);

app.controller("main", ['$scope', '$http', function($scope, $http) {
	$scope.test = "test";
	$scope.loadData = function() {
		console.log("init");
		$http.get('/dioceses/olympia.json').then(function(data) { 
			$scope.parishes = data.data.parishes;
		});
	}
}]);

// var map;
// function initMap() {
// 	map = new google.maps.Map(document.getElementById('map'), {
// 		center: {lat: -34.397, lng: 150.644},
// 		zoom: 8
// 	});
// }