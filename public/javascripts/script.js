var app = angular.module('app', ['ui.grid', 'ngRoute', 'ngDialog']);

app.controller("IndexController", ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {

    $scope.dialog = function () {
        console.log("run");
        ngDialog.open({template: '/data/upload'});
    };

    $http.get('/data/json').
        success(function (data) {
            console.log(data);
            $scope.myData = data;
        });
    $scope.myOptions = {data: 'myData'};

}]);

$(document).ready(function () {
// Increment z-indexes
    $('.div').each(function (index) {
        $(this).css("z-index", index);
    });
    $('.container').css('height', '+=20em');
});