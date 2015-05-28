var app = angular.module('app', ['ui.grid']);

var testData = {
    "US": 30,
    "Saudi": 20,
    "Chile": 50,
    "Argentina": 100,
    "Italy": 80
};

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {
    //$scope.data = testData;
    //console.log($scope.data);

    $scope.myData = [
        {rank: 1, region: "US", percent: 30},
        {rank: 2, region: "Saudi", percent: 20},
        {rank: 3, region: "Chile", percent: 100},
        {rank: 4, region: "Italy", percent: 80}];
    $scope.myOptions = { data: 'myData' };
}]);

$(document).ready(function () {
// Increment z-indexes
    $('.div').each(function (index) {
        $(this).css("z-index", index);
    });
    $('.container').css('height','+=20em');
});