
'use strict';
app.factory('authenticationService', ['$http', '$q','$injector', 'localStorageService', 'reservationsSettings',
    function ($q, $injector, localStorageService, reservationsSettings) {
        var serviceBase = reservationsSettings.apiServiceBaseUri;
        var authenticationServiceFactory = {};

        var _authentication = {
            isAuthenticated: false,
            userName: "",
        };

        var _getUserName = function () {
            return $http.get(serviceBase + "client/authentication").then(function (results) {
                return results;
            });
        }


        var _loginNTLM = function (user,unencryptedUser) {
            var data = "grant_type=password&username=" + encodeURIComponent(user);// "&password=" + loginData.password;
            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {              
               localStorageService.set('authenticationData', { token: response.access_token, userName: unencryptedUser });                
                _authentication.isAuthenticated = true;
                _authentication.userName = unencryptedUser;
                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {
            localStorageService.remove('authenticationData');
            localStorageService.remove('authorizationData');
            _authentication.isAuth = false;
            _authentication.userName = "";
        };

        var _verifyNTLM = function()
        {
            _logOut();
            var deferred = $q.defer();
            $http.post(serviceBase + "api/account/verify", null).success(function (response) {
                deferred.resolve(response);
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        var _fillAuthData = function () {
            var authData = localStorageService.get('authenticationData');
            if (authData) {
                _authentication.isAuthenticated = true;
                _authentication.userName = authData.userName;
            }
        };

        authenticationServiceFactory.logOut = _logOut;
        authenticationServiceFactory.fillAuthData = _fillAuthData;
        authenticationServiceFactory.authentication = _authentication;

        authenticationServiceFactory.getUserName = _getUserName;
        authenticationServiceFactory.verifyNTLM = _verifyNTLM;
        authenticationServiceFactory.loginNTLM = _loginNTLM;
        

        return authenticationServiceFactory;
    //}
//})();
}]);