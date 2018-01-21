"use strict";

angular.module('Reservations').directive('menu', ['$timeout', function ($timeout) {
    return {
        scope: {

        },
        transclude: true,
        templateUrl: 'app/menuframework/menu/menuTemplate.html',
        controller: 'menuController',
        link: function (scope, el, attr) {
            var item = el.find('.selectable-item:first');
            $timeout(function () {
                item.trigger('click');
            });
        }
    };
}]);