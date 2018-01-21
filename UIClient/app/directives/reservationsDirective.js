(function() {
    'use strict';

    app.directive('reservationsDirective', reservationsDirective);
    reservationsDirective.$inject = ['$window'];
    
    function reservationsDirective ($window) {
        // Usage:
        //     <reservations-directive></reservations-directive>
        // Creates:
        // 
        var directive = {
            scope: {},
            restrict: 'E',
            controller: "reservationsController",
            templateUrl: "app/views/reservations.html"
        };
        return directive;

    }

})();