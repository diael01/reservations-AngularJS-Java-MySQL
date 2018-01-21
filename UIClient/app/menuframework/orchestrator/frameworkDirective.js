"use strict";

angular.module("Reservations").directive("framework", function () {
    return {
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@'
        },
        controller: "frameworkController",
        templateUrl: "app/menuframework/orchestrator/frameworkTemplate.html"
        
    };
});