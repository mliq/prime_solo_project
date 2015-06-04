var app = angular.module('app', ['ui.grid','ui.bootstrap']);

function sortByPc(a,b) {
    if (a.percent < b.percent)
        return 1;
    if (a.percent > b.percent)
        return -1;
    return 0;
}

var svgSmall = '<svg class="svg_1" width="40" height="30">' +
    '<circle r="5" cy="7" cx="11" stroke-width="1.5" stroke="#000000" fill="none"></circle>' +
    '<circle class="svg_2" r="5" cy="7" cx="27" stroke-width="1.5" stroke="#000000" fill="none"></circle>' +
    '<circle class="svg_3" r="5" cy="21" cx="11" stroke-width="1.5" stroke="#000000" fill="none"></circle>' +
    '<circle class="svg_4" r="5" cy="21" cx="27" stroke-width="1.5" stroke="#000000" fill="none"></circle>' +
    '</svg>';

var stableHorse = '<img class="stableHorse" src="/images/new/stable_horse.png">';

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

//headerCellTemplate: svgSmall - Bug causes header to grow, or other headings to appear cut off. https://github.com/angular-ui/ng-grid/issues/1776

    $scope.columns = [
        { field: 'Image', visible: false},
        { name: '  ', cellTemplate: stableHorse, width: 40},
        { name: ' ', cellTemplate: svgSmall, width: 40, cellClass: 'cellToolTip'},
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
