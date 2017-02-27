'use strict';

angular.module('app.light', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('light', {
                url: '/light',
                templateUrl: 'pages/light/light.html',
                controller:'LightCtrl',
                resolve:{},
                cache:true,
                onEnter:function(){console.log('light enter')},
                onExit:function(){console.log('light exit')}
            });
    })

    .controller('LightCtrl', function($scope,resourceService) {
        $scope.items=[
            {id:1,text:'客厅主灯',status:'off'},
            {id:2,text:'卧室主灯',status:'off'},
            {id:0,text:'卧室床头灯',status:'off'}
        ];
        $scope.itemClick= function (item) {
            if(item.status=='on'){item.status='off'}else{item.status='on'}
            resourceService.socket.emit('lightCtrl', {event:'lightStatusChange',lightId:item.id,lightStatus:item.status,direction:'down'});
            console.log("('lightCtrl', {event:'lightStatusChange',lightId:item.id,lightStatus:item.status,direction:'down'})");
        }
    });