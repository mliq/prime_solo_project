var app = angular.module('app', ['ui.grid']);

function sortByPc(a,b) {
    if (a.percent < b.percent)
        return -1;
    if (a.percent > b.percent)
        return 1;
    return 0;
}

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {

    $http.get('/data/json').
        success(function (data) {
            console.log(data);
            $scope.myData = data.sort(sortByPc);
            console.log($scope.myData);
        });

    //Remove first 5 rows from table data.
    // First sort. If sorting here, don't sort in html.

    //$scope.gridOpts.data.splice(0,1);

    $scope.myOptions = {
        data: 'myData',
        columnDefs: [
            { name: 'region', displayName: 'Country' },
            { name: 'percent', displayName: 'Progress', visible: true }
        ]
    };

}]);

app.directive('popover', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).popover('show');
            }, function(){
                // on mouseleave
                $(element).popover('hide');
            });
        }
    };
});

$(document).ready(function () {
    // Increment z-indexes
    $('.div').each(function (index) {
        $(this).css("z-index", index);
    });
    $('.container').css('height', '+=20em');
});
