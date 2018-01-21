(function() {
    'use strict';

    app.directive('editReservationDirective', editReservationDirective);

    editReservationDirective.$inject = ['$window'];
    
    function editReservationDirective ($window) {
        // Usage:
        //     <edit-reservation-directive></edit-reservation-directive>
        // Creates:
        // 
        var directive = {
            scope: {},
            restrict: 'E',
            controller: "editReservationController",
            templateUrl: "app/views/editReservation.html"
        };
        return directive;
    }

})();