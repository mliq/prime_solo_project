var app = angular.module('app', ['ui.grid']);

function sortByPc(a,b) {
    if (a.percent < b.percent)
        return 1;
    if (a.percent > b.percent)
        return -1;
    return 0;
}

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {

    $http.get('/data/json').
        success(function (data) {
            console.log(data);
            $scope.myData = data.sort(sortByPc);
            //console.log($scope.myData);
            // | orderBy:'-percent'

            //Remove first 5 rows from table data.
            $scope.tableData = $scope.myData.splice(5);
        });

    $scope.myOptions = {
        data: 'tableData',
        columnDefs: [
            { name: 'region', displayName: 'Country' },
            { name: 'percent', displayName: 'Progress', visible: true }
        ],
        minRowsToShow: 18
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
