(function () {
    'use strict';

    app.factory('reservationsService', reservationsService);

    reservationsService.$inject = ['$http', '$q', 'reservationsSettings', '$log'];

    function reservationsService($http, $q, reservationsSettings, $log) {

        var serviceBase = reservationsSettings.apiServiceBaseUri;
        var reservationServiceFactory = {};        

        var _getReservations = function() {
            var deferred = $q.defer();
            $http.get(serviceBase + "api/reservations/getReservations", null).success(function (response) {
                deferred.resolve(response);
            }).error(function (err) {
                deferred.reject(err);
                console.log('Error' + JSON.stringify(response));
            });
            return deferred.promise;
        }

        var _createReservation = function (reservation) {
            var deferred = $q.defer();
            $http.post(serviceBase + "api/reservations/createReservation", reservation).success(function (response) {
                deferred.resolve(response);
            }).error(function (err) {
                deferred.reject(err);
                console.log('Error' + JSON.stringify(response));
            });
            return deferred.promise;
        }

        var _getReservationBySlotAndCourt = function (slot,court) {
            var deferred = $q.defer();
            $http.get(serviceBase + "api/reservations/getReservationBySlotAndCourt/" + slot + "/" + court).success(function (response) {
                deferred.resolve(response);
            }).error(function (err) {
                deferred.reject(err);
                console.log('Error' + JSON.stringify(response));
            });
            return deferred.promise;
        }

        var _getReservationsByFacilityId = function (id) {
            var deferred = $q.defer();
            $http.get(serviceBase + "api/reservations/getReservationsByFacilityId/" + id).success(function (response) {
                deferred.resolve(response);
            }).error(function (err) {
                deferred.reject(err);
                console.log('Error' + JSON.stringify(response));
            });
            return deferred.promise;
        }

        var _cancelReservation = function (id) {
            $http.post(serviceBase + "api/reservations/deleteReservation/" + id);
            }
        

        reservationServiceFactory.getReservations = _getReservations;
        reservationServiceFactory.createReservation = _createReservation;
        reservationServiceFactory.getReservationBySlotAndCourt = _getReservationBySlotAndCourt;
        reservationServiceFactory.getReservationsByFacilityId = _getReservationsByFacilityId;
        reservationServiceFactory.cancelReservation = _cancelReservation;
        return reservationServiceFactory;
    }
})();