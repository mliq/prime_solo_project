var app = angular.module('app', ['ui.grid']);

function sortByPc(a,b) {
    if (a.percent < b.percent)
        return 1;
    if (a.percent > b.percent)
        return -1;
    return 0;
}

var svgSmall = '<svg width="25" height="25"> <circle id="svg_1" r="4" cy="6.25" cx="6.25" stroke-width="1.5" stroke="#000000" fill="none"></circle> <circle id="svg_2" r="4" cy="6.25" cx="18.75" stroke-width="1.5" stroke="#000000" fill="none"></circle> <circle id="svg_3" r="4" cy="18.75" cx="6.25" stroke-width="1.5" stroke="#000000" fill="none"></circle> <circle id="svg_4" r="4" cy="18.75" cx="18.75" stroke-width="1.5" stroke="#000000" fill="none"></circle></svg>';
var goalsTemplate = "<img ng-src='/svg'>";
    //'<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(\'age\')}}">Visible text</a></div>';

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {

    $http.get('/data/json').
        success(function (data) {
            $scope.myData = data.sort(sortByPc);

            //Remove first 5 rows from table data.
            $scope.tableData = $scope.myData.splice(5);

            // Add Images
            console.log($scope.tableData);
            //$scope.tableData[9].image = svgSmall;
        });

    $scope.columns = [
        { field: 'Image', name: 'Goals', visible: false},
        { name: 'Goals', cellTemplate: svgSmall},
        { field: 'region', name: 'Country' },
        { field: 'percent', name: 'Progress'}
    ];

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
