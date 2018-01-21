(function () {
    'use strict';

    app.factory('facilitiesService', facilitiesService);

    facilitiesService.$inject = ['$http', '$q','reservationsSettings', '$log'];

    function facilitiesService($http, $q, reservationsSettings, $log) {

        var serviceBase = reservationsSettings.apiServiceBaseUri;
        var facilitiesServiceFactory = {};        

        var _getFacilities = function () {
            var deferred = $q.defer();
            $http.get(serviceBase + "api/facilities/getFacilities").success(function (response) {
            //$http.get(serviceBase + "api/facilities").success(function (response) {
                deferred.resolve(response);
            })
            .error(function (err) {
                deferred.reject(err);
                console.log('Error' + JSON.stringify(err));
            });
            return deferred.promise;
        }

        var _getFacilitiesByCriteria = function (token) {
            var deferred = $q.defer();
            $http.get(serviceBase + "api/facilities/getFacilitiesByCriteria/"+token).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (err) {
                deferred.reject(err);
                console.log('Error' + JSON.stringify(err));
            });
            return deferred.promise;
        }

        facilitiesServiceFactory.getFacilities = _getFacilities;
        facilitiesServiceFactory.getFacilitiesByCriteria = _getFacilitiesByCriteria;
        return facilitiesServiceFactory;
    }
})();