(function () {
    'use strict';

    app.controller('reservationsController', reservationsController);
    reservationsController.$inject = ['$location', 'reservationsService', "$log", "$scope","facilitiesService", "$routeParams"];

    function reservationsController($location, reservationsService, $log, $scope, facilitiesService, $routeParams) {
        $scope.facility = JSON.parse($routeParams.facility);
        $scope.allReservations = getReservationsByFacilityId($scope.facility.id);
        $scope.time_array = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
        $scope.link_name = "Reserve";
        $scope.courts = $scope.facility.courts;
        $scope.facilInput = "";
        $scope.reservation =
            {
                id: null,
                courtId: null,
                priceId: null,
                userId: null,
                statusId: null,
                comments: null,
                startTime: null,
                endTime: null,
                facilityId: null,
                playersNo: null,
                slotNo: null,
                players: null
            };
        $scope.allReservations = [];
        

        $scope.searchFacility = function (facilInput) {
            facilitiesService.GetFacilitiesBySearchCriteria(facilInput).then(function (response) {              
                $scope.facility = response;      
            },
            function (response) {
                $log.error("getReservations failed:" + JSON.stringify(response));
            });                     
        }      

        $scope.createReservation = function (slot, court) {
            if ($scope.actions[court][slot] === "Edit/Cancel")
            {
                var reservation = reservationsService.getReservationBySlotAndCourt(slot, court).then(function (response) {
                    $location.path("/editreservation/" + JSON.stringify(response));
                   },
                   function (response) {
                       $log.error("getReservationBySlotAndCourt failed:" + JSON.stringify(response));
                   });
            }
            else {               
                        $scope.reservation.courtId = court;
                        $scope.reservation.userId = 1;
                        $scope.reservation.priceId = 0;
                        $scope.reservation.statusId = 2; //reserved
                        $scope.reservation.startTime = new Date(); 
                        $scope.reservation.startTime.setHours(slot + 4);
                        $scope.reservation.startTime.setMinutes(0);
                        $scope.reservation.startTime.setSeconds(0);
                        $scope.reservation.endTime = new Date();
                        $scope.reservation.endTime.setHours(slot + 5);
                        $scope.reservation.endTime.setMinutes(0);
                        $scope.reservation.endTime.setSeconds(0);
                        $scope.reservation.comments = "Create Reservation from UI";
                        $scope.reservation.facilityId = $scope.facility.id;
                        $scope.reservation.playersNo = 2;
                        $scope.reservation.slotNo = slot;
                        reservationsService.createReservation($scope.reservation).then(function (response) {
                            $scope.reservation = response;
                            if ($scope.reservation.statusId === 2) //reserved
                            {
                                $scope.actions[court][slot] = "Edit/Cancel";

                            }
                            else if ($scope.reservation.statusId === 1) //free
                            {
                                $scope.actions[court][slot] = "Reserve";
                            }
                            $scope.allReservations.push($scope.reservation);

                        },
                   function (response) {
                       $log.error("createReservation failed:" + JSON.stringify(response));
                   });
                }
        }
        

        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) input.push(i);
            return input;
        };

        function getReservationsByFacilityId (id) {
            reservationsService.getReservationsByFacilityId(id).then(function (response) {
                $scope.allReservations = response;
                $scope.actions = matrix($scope.courts, 18);
            },
           function (response) {
               $log.error("getReservationsByFacilityId failed:" + JSON.stringify(response));
           });
        }
      
        function matrix (rows, cols)
        {          
            var emptyReserve = true;
            if ($scope.allReservations.length !== 0)
                emptyReserve = false;
            var arr = [];
            // Creates all lines:
            for (var i = 0; i < rows; i++)
            {
                // Creates an empty line
                arr.push([]);
                // Adds cols to the empty line:
                arr[i].push( new Array(cols));
                for(var j = 0; j < cols; j++){
                    // Initializes: 
                    if(emptyReserve === true)
                        arr[i][j] = 'Reserve';
                    else {
                        for (var k = 0; k < $scope.allReservations.length; k++)
                        {
                            var res = $scope.allReservations[k];
                            if (res.courtId === i && res.slotNo === j) {
                                arr[i][j] = 'Edit/Cancel';
                                break;
                            }
                            else
                                arr[i][j] = 'Reserve';
                        }
                    }
                }
            }
            return arr;
        }

    }
})();
