var app = angular.module('app', []);

var testData = {
    "US": 30,
    "Saudi": 20,
    "Chile": 50
};

app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.data = testData;
    console.log($scope.data);
}]);