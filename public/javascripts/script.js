var app = angular.module('app', ['ui.grid', 'ui.bootstrap']);

function sortByPc(a, b) {
    return b.percent - a.percent;
}

var stableHorse = '<img class="stableHorse" src="/images/new/stable_horse.png">';

var regionTemplate = '<div class="ui-grid-cell-contents"><span class=" flag-icon-background flag-icon-{{row.entity.flag}}"></span>{{ COL_FIELD }}</div>';

app.controller("IndexController", ['$scope', '$http', function ($scope, $http) {

    $http.get('/data/json').
        success(function (data) {
            console.log(data);
            $scope.myData = data.sort(sortByPc);
            console.log($scope.myData);
            //Remove first 5 rows from table data.
            $scope.tableData = $scope.myData.splice(5);

            // Add Images
            console.log($scope.tableData);
            //$scope.tableData[9].image = svgSmall;
        });

    $scope.columns = [
        {field: 'Image', visible: false},
        {name: '  ', cellTemplate: stableHorse, width: 40},
        {name: ' ', cellTemplate: 'svgSmallTemplate.html', width: 40, cellClass: 'cellToolTip'},
        {field: 'region', name: 'Country', cellTemplate: regionTemplate},
        {field: 'percent', name: 'Progress'}
    ];

    $scope.myOptions = {
        data: 'tableData',
        columnDefs: $scope.columns,
        minRowsToShow: 18
    };

}]);

app.directive('popover', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).hover(function () {
                // on mouseenter
                $(element).popover('show');
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
