var app = angular.module('app', ['ui.grid']);

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {
    //$scope.data = testData;
    //console.log($scope.data);

   $http.get('/data/json').
        success(function (data) {
            console.log(data);
            $scope.myData =  data;
        });

    $scope.myOptions = { data: 'myData' };
}]);

$(document).ready(function () {
// Increment z-indexes
    $('.div').each(function (index) {
        $(this).css("z-index", index);
    });
    $('.container').css('height','+=20em');
});