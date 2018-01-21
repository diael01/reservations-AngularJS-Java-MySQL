(function() {
    'use strict';

    app.directive('facilitiesDirective', facilitiesDirective);
    facilitiesDirective.$inject = ['$window'];
    
    function facilitiesDirective ($window) {
        // Usage:
        //     <facilities-directive></facilities-directive>
        // Creates:
        // 
        var directive = {
            scope: {},
            restrict: 'E',
            controller: "facilitiesController",
            templateUrl: "app/views/facilities.html"
        };
        return directive;

    }

})();