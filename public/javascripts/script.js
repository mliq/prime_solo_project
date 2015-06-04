var app = angular.module('app', ['ui.grid','ui.bootstrap']);

function sortByPc(a,b) {
    if (a.percent < b.percent)
        return 1;
    if (a.percent > b.percent)
        return -1;
    return 0;
}

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
        { name: ' ', cellTemplate: 'svgSmallTemplate.html', width: 40, cellClass: 'cellToolTip'},
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

//app.directive('tooltip', function(){
//    return {
//        restrict: 'A',
//        link: function(scope, element, attrs){
//            $(element).hover(function(){
//                // on mouseenter
//                $(element).tooltip('show');
//            }, function(){
//                // on mouseleave
//                $(element).tooltip('hide');
//            });
//        }
//    };
//});

$(document).ready(function () {
    // Increment z-indexes
    $('.div').each(function (index) {
        $(this).css("z-index", index);
    });
    $('.container').css('height', '+=20em');
});
