(function () {
    'use strict';

    app.controller('facilitiesController', facilitiesController);
    facilitiesController.$inject = ['$location', 'facilitiesService', "$log","$scope", "$window"]; 

    function facilitiesController($location, facilitiesService, $log, $scope, $window, reser)
    {
        $scope.token = "";
        facilitiesService.getFacilities().then(function (response) {
            $scope.facilities = response;
        },
        function (response) {
            $log.error("getFacilities failed:" + JSON.stringify(response));
        });

        $scope.makeReservation = function (facility)
        {
            $location.path("/reservations/" +JSON.stringify(facility));
        }

        $scope.showMap = function (facility)
        {
            $window.location.href = "http://maps.googleapis.com/maps/api/staticmap?center=" + facility.latitude + "," + facility.longitude +
                "&zoom=12&size=800x800&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:C%7C" + facility.latitude +"," + facility.longitude +
                 "&sensor=false&key=AIzaSyB8foG5NWKekSaTS63qt4yVhfVJyckyzY8";
        }

        $scope.searchFacility = function (token) {
            if (token === "") {
                facilitiesService.getFacilities().then(function (response) {
                    $scope.facilities = response;
                },
                function (response) {
                    $log.error("getFacilities failed:" + JSON.stringify(response));
                });
            }
            else {
                facilitiesService.getFacilitiesByCriteria(token).then(function (response) {
                    $scope.facilities = response;
                },
                 function (response) {
                     $log.error("getFacilitiesByCriteria failed:" + JSON.stringify(response));
                 });
            }
        }
    }
})();
