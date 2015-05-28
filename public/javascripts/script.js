var app = angular.module('app', ['ui.grid']);

var testData = {
    "US": 30,
    "Saudi": 20,
    "Chile": 50,
    "Argentina": 100,
    "Italy": 80
};

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {
    $scope.data = testData;
    console.log($scope.data);

    $scope.myData = [{name: "Moroni", age: 50},
        {name: "Teancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}];
    $scope.myOptions = { data: 'myData' };
}]);

$(document).ready(function () {
// Increment z-indexes
    $('.div').each(function (index) {
        $(this).css("z-index", index);
    });
    $('.container').css('height','+=20em');
});