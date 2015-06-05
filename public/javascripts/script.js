var app = angular.module('app', ['ui.grid']);

var sortByPc = function (a, b) {
    return b.percent - a.percent;
};

var stableHorse = '<img class="stableHorse" src="/images/new/stable_horse.png">';

var regionTemplate = '<div class="ui-grid-cell-contents"><span class=" flag-icon-background flag-icon-{{row.entity.flag}}"></span>{{ COL_FIELD }}</div>';

var lastMonth = new Date().getMonth()-1;

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {
    //last month
    $scope.myDate = new Date().setMonth(lastMonth);

    $http.get('/data/json').
        success(function (data) {
            $scope.myData = data.sort(sortByPc);
            // Color circles based on data columns
            $scope.circleColoring();
            //Remove first 5 rows from table data.
            $scope.tableData = $scope.myData.splice(5);
        });

    $scope.circleColoring = function(){
        // Big circle data
        console.log($scope.myData);

    };

    $scope.columns = [
        {name: '  ', cellTemplate: stableHorse, width: 40},
        {name: ' ', cellTemplate: 'svgSmallTemplate.html', width: 40},
        {field: 'region', name: 'Country', cellTemplate: regionTemplate},
        {field: 'percent', name: '%', width: 51, type: 'number'}
    ];

    $scope.myOptions = {
        data: 'tableData',
        columnDefs: $scope.columns,
        minRowsToShow: 18,
        enableColumnMenus: false,
        enableHorizontalScrollbar: 0,
        enableVerticalScrollbar: 0
    };

}]);

app.directive('popover', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).hover(function () {
                // on mouseenter
                $(element).popover('show');
                $('.popover').popover({followMouse: true});
            }, function () {
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
