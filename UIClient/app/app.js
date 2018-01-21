var app = angular.module("Reservations", [
"ngRoute", "LocalStorageModule", "ngResource", "ui.router"]);//"angularjs-crypto", "720kb.datepicker",

app.config(function ($routeProvider, $provide, $stateProvider)
{
    var routes = [
        {
            url: "/editreservation/:reservation",
            config: {
                template: "<edit-reservation-directive></edit-reservation-directive>"
            }
        },
         {
             url: "/reservations",
             config: {
                 template: "<reservations-directive></reservations-directive>"
             }
         },
        {
            url:"/reservations/:facility",
            config:{
                template: "<reservations-directive></reservations-directive>"
            }
        },
        {
            url: "/facilities",
            config: {
                template: "<facilities-directive></facilities-directive>"
            }
        }
    ];
    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });

    $routeProvider.when("/", {controller:"frameworkController"});

    $provide.decorator("$exceptionHandler", [
        "$delegate", "$log", function($delegate, $log) {
            return function(exception,cause)
            {
                $log.error(exception.message);
                $delegate(exception,cause);
            }
        }
    ]);

    $routeProvider.when("/logout", {
        resolve: {
            redirect: function(authenticationService) {
                authenticationService.logout();
            }
        }
      });
});


    //var serviceBase = "http://localhost:50325/";
    //var serviceBase = "http://localhost:8080/reservations-back-1.0/";
    var serviceBase = "http://localhost:8080/reservations-back/";
    app.constant("reservationsSettings", {
        apiServiceBaseUri: serviceBase,
        clientId: "reservationApp",
        enableAUTHChecking: false
    })

    app.config(function($httpProvider, $logProvider)
    {
        $httpProvider.interceptors.push("authenticationInterceptorService");
    });

    app.run(["authenticationService","localStorageService","$rootScope","$location","$log","reservationsSettings",
    function(authenticationService,localStorageService,$rootScope,$location,$log,reservationsSettings)
    {
        $location.path("/");
        var lastState = localStorageService.get("lastState");
        if(reservationsSettings.enableAUTHChecking) {
            authenticationService.verifyNTLM().then(function(response) {
                $rootScope.savedSuccessfully = true;
                $rootScope.isAuthorized = response;
                //var keyEqiv = CryptoJS.enc.Utf8.parse("8080808080808080");
                //var unEncryptedUser = $rootScope.isAuthorized["user"];
                //var encryptedUser = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(unEncryptedUser),
                //    keyEqiv,
                //    {keySize:128/8, iv:keyEqiv, mode: CryptoJS.mode.CBC, padding:CryptoJS.pad.Pkcs7});
                localStorageService.set("authorizationData", $rootScope.isAuthorized);
                authenticationService.loginNTLM(encryptedUser,unEncryptedUser).then(function() {
                    $rootScope.authentication = authenticationService.authentication;
                },
                function(response)
                {
                    $rootScope.message = "Login failed:"+ JSON.stringify(response);
                    $log.error($rootScope.message);
                });
            },
            function(response)
            {
                $rootScope.isAuthorized = {};
                $rootScope.message = "Failed to verify user due to:"+ JSON.stringify(response);
                $log.error($rootScope.message);
            });
        } else {
            $rootScope.authentication = authenticationService.authentication;
            $rootScope.authentication.isAuthenticated = true;
            $rootScope.authentication.userName = "SuperUser";
            $rootScope.isAuthorized = {"admin":"True", "reservations":"True"};
        }
        $location.path(lastState);
    }
]);