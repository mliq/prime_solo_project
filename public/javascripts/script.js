var app = angular.module('app', ['ui.grid']);

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {

    $http.get('/data/json').
        success(function (data) {
            console.log(data);
            $scope.myData =  data;
        });
    $scope.myOptions = { data: 'myData' };

    //$scope.auth = $http.get('/users/list').
    //    success(function(data){
    //        console.log(data);
    //        data ? return true : return false;
    //    });
}]);

$(document).ready(function () {
// Increment z-indexes
    $('.div').each(function (index) {
        $(this).css("z-index", index);
    });
    $('.container').css('height','+=20em');
});