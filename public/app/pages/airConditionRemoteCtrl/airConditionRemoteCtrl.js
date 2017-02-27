'use strict';

angular.module('app.airConditionRemoteCtrl', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('airConditionRemoteCtrl', {
                url: '/airConditionRemoteCtrl',
                templateUrl: 'pages/airConditionRemoteCtrl/airConditionRemoteCtrl.html',
                controller: 'AirConditionRemoteCtrlCtrl',
                resolve: {},
                cache: true,
                onEnter: function () {
                    console.log('airConditionRemoteCtrl enter')
                },
                onExit: function () {
                    console.log('airConditionRemoteCtrl exit')
                }
            });
    })

    .controller('AirConditionRemoteCtrlCtrl', function ($scope,resourceService) {
        $scope.resourceService=resourceService;
        $scope.power_switch_click = function () {
            if(resourceService.airCtrl.temperature.airConditioningStatus=='on'){
                resourceService.socket.emit('airCtrl', {event:'stopWork',direction:'down'});
            }else{
                resourceService.socket.emit('airCtrl', {event:'startWork',direction:'down'});
            }

        };
        $scope.addTemperature = function () {
            if(resourceService.deviceStatus.airConditioner.settingTem>=31){return}
            resourceService.socket.emit('airCtrl', {event:'addTemperature',direction:'down'});
        };
        $scope.reduceTemperature = function () {
            if(resourceService.deviceStatus.airConditioner.settingTem<=16){return}
            resourceService.socket.emit('airCtrl', {event:'reduceTemperature',direction:'down'});
        };
        $scope.coldMode = function () {
            resourceService.socket.emit('airCtrl', {event:'coldMode',direction:'down'});
        };
        $scope.windMode = function () {
            resourceService.socket.emit('airCtrl', {event:'windMode',direction:'down'});
        };
        $scope.reduceHumidityMode = function () {
            resourceService.socket.emit('airCtrl', {event:'reduceHumidityMode',direction:'down'});
        };
        $scope.heatMode = function () {
            resourceService.socket.emit('airCtrl', {event:'heatMode',direction:'down'});
        };
        $scope.windDirection = function () {
            resourceService.socket.emit('airCtrl', {event:'windDirection',direction:'down'});
        };
        $scope.windDirectionAuto = function () {
            resourceService.socket.emit('airCtrl', {event:'windDirectionAuto',direction:'down'});
        };
        $scope.wind1 = function () {
            resourceService.socket.emit('airCtrl', {event:'wind1',direction:'down'});
        };
        $scope.wind2 = function () {
            resourceService.socket.emit('airCtrl', {event:'wind2',direction:'down'});
        };
        $scope.wind3 = function () {
            resourceService.socket.emit('airCtrl', {event:'wind3',direction:'down'});
        };

    });