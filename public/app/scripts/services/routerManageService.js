'use strict';
angular.module('app.routerManageService', [])
    .factory('routerManageService', function ($state) {
        //state go function
        var stateGo = function (to, params, options) {
            $state.go(to, params, options)
        };
        return {
            stateGo: stateGo
        };

    });