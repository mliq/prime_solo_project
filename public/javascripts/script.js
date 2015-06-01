var app = angular.module('app', ['ui.grid','ngRoute']);

//app.config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/users/upload',{
//    templateUrl: "/data/upload", controller: 'IndexController'}).otherwise({
//    redirectTo: '/'});
//}]);

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {
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