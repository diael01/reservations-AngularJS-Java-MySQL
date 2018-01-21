(function () {
    'use strict';

    app.controller('editReservationController', editReservationController);
    editReservationController.$inject = ['$location', 'reservationsService', "$log", "$scope", "facilitiesService", "$routeParams", "$http"];

    function editReservationController($location, reservationsService, $log, $scope, facilitiesService, $routeParams, $http) {
       
        $scope.reservation = JSON.parse($routeParams.reservation);
        $scope.reservation.comments = "Edit Reservation from UI";
        

        $scope.cancelReservation = function (id) {
            $http.post(serviceBase + "api/reservations/deleteReservation/" + id);
            $location.path("/reservations/");                                    
        }
    }
})();
