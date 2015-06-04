var app = angular.module('app', ['ui.grid']);

function sortByPc(a,b) {
    if (a.percent < b.percent)
        return 1;
    if (a.percent > b.percent)
        return -1;
    return 0;
}

var svgSmall = "<img src='/svg'>";

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {

    $http.get('/data/json').
        success(function (data) {
            console.log(data);
            $scope.myData = data.sort(sortByPc);

            //Remove first 5 rows from table data.
            $scope.tableData = $scope.myData.splice(5);
            // Add Images
            $scope.tableData[9].image = svgSmall;
            $scope.columns = [
                { name: 'Image', displayName: 'Goals'},
                { name: 'region', displayName: 'Country' },
                { name: 'percent', displayName: 'Progress', visible: true }
                ]
            $scope.columns.push({ field: 'Image'});
        });

    $scope.myOptions = {
        data: 'tableData',
        columnDefs: $scope.columns,
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
