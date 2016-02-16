
var finalApp = angular.module('final', ['ngRoute']);

finalApp.config(function($routeProvider) 
    {
    $routeProvider
        .when('/', 
              {
              templateUrl : 'pages/home.html',
			  })
        .when('/flightSearch', 
              {
              templateUrl : 'pages/flightSearch.html',
              controller  : 'flightController'
              })
        .when('/map',
              {
              templateUrl: 'pages/map.html',
              controller : 'MainCtrl'
              });
	});

finalApp.service("flightDestination", function(){
    this.destination = "NYC";
});

finalApp.service("flightOrigin", function(){
    this.origin = "DEN";
});

finalApp.service("flightDuration", function(){
    this.duration = "1--15";
});

finalApp.service("flightDirect", function(){
    this.direct = "false";
});

finalApp.service("flightMaxPrice", function(){
    this.maxPrice = 1000;
});

finalApp.controller('flightController', ['$scope', '$http', 'flightDestination', 'flightOrigin', 'flightDuration', 'flightDirect', 'flightMaxPrice', function($scope, $http, flightDestination, flightOrigin, flightDuration, flightDirect, flightMaxPrice){
    
    $scope.destination = flightDestination.destination;
    $scope.$watch('destination', function(){
        flightDestination.destination = $scope.destination;
    });
    
    $scope.origin = flightOrigin.origin;
    $scope.$watch('origin', function(){
        flightOrigin.origin = $scope.origin;
    });
    
    $scope.duration = flightDuration.duration;
    $scope.$watch('duration', function(){
        flightDuration.duration = $scope.duration;
    });
    
    $scope.direct = flightDirect.direct;
    $scope.$watch('direct', function(){
        flightDirect.direct = $scope.direct;
    });
    
    $scope.maxPrice = flightMaxPrice.maxPrice;
    $scope.$watch('maxPrice', function(){
        flightMaxPrice.maxPrice = $scope.maxPrice;
    });
    
    
  $scope.flightInfo = function(){
      $scope.numResults;
$http.get("https://api.sandbox.amadeus.com/v1.2/flights/extensive-search?apikey=Mpqv1TDy9DJks9qhIAw3dXcRCVVGSlbZ&origin=" + $scope.origin + "&destination=" + $scope.destination + "&duration=" + $scope.duration + "&direct=" + $scope.direct + "&max_price=" + $scope.maxPrice + "&aggregation_mode=DAY")
.success(function(result){  
    console.log('yay');
    $scope.flights = [];
    
    
    for(var i = 0; i < result.results.length; i++)
        {
            $scope.flights.push(result.results[i]);
            $scope.numResults = i;
        }
})
.error(function(data, status){
     $scope.numResult = 0;
console.log('no good');
   
});

    };
}]);

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

finalApp.controller('MainCtrl', function ($scope, $window) {
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
});
    