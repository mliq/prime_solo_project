var app = angular.module('app', []);

var testData = {
    "US": {
        "percent": 30
    },
    "Saudi": {
        "percent": 20
    },
    "Chile": {
        "percent": 50
    }
};

app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.data = testData;
    console.log($scope.data);
}]);