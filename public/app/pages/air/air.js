'use strict';

angular.module('app.air', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('air', {
                url: '/air',
                templateUrl: 'pages/air/air.html',
                controller: 'AirCtrl',
                resolve: {},
                cache: true,
                onEnter: function () {
                    console.log('air enter')
                },
                onExit: function () {
                    console.log('air exit')
                }
            });
    })

    .controller('AirCtrl', function ($scope, resourceService,$state) {
        $scope.resourceService=resourceService;
        $scope.onHole= function (item) {
          switch (item){
              case "temperature":

                  break;
              case "humidity":

                  break;
          }
        };
        $scope.onClick= function (item) {
            switch (item){
                case "temperature":
                    if(resourceService.airCtrl.temperature.autoCtrlStatus){
                        resourceService.socket.emit('airCtrl', {event:'stopTemAutoCtrl',direction:'down'});
                    }else{
                        resourceService.socket.emit('airCtrl', {event:'startTemAutoCtrl',direction:'down'});
                    }
                   // $state.go('airConditionRemoteCtrl');
                    break;
                case "humidity":

                    break;
            }
        };
        $scope.onHold= function (item) {
            switch (item){
                case "temperature":
                     $state.go('airConditionRemoteCtrl');
                    break;
                case "humidity":

                    break;
            }
        };

    });