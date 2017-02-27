'use strict';

angular.module('app.index', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: 'pages/index/index.html',
                controller: 'IndexCtrl',
                resolve: {},
                cache: true,
                onEnter: function () {
                    console.log('index enter')
                },
                onExit: function () {
                    console.log('index exit')
                }
            });
    })

    .controller('IndexCtrl', function ($scope,resourceService,$state) {

        $scope.SocketService = resourceService.io;
        $scope.resourceService=resourceService;
        $scope.IndexCtrl={};
        $scope.IndexCtrl.musicFileDir=[];
        $scope.toggle=false;
        $scope.click= function () {
            resourceService.io.socket.emit('chatMessage', $scope.toggle);
        };
        $scope.changeMusic=function(music){
            if(music=='equality.mp3'){
                resourceService.io.socket.emit('chatMessage', 'back');
            }else{
                resourceService.io.socket.emit('chatMessage', 'change');
            }
        };

        $scope.navHold= function (message)
        {
            switch (message){
                case 'music':
                    $state.go('detailSetting');
                    break;
            }
        };

        $scope.items=[
            {img:'music.jpg',text:'Music',action:'music'},
            {img:'air.jpg',text:'Air',action:'air'},
            {img:'light.jpg',text:'Light',action:'light'}
        ];
        $scope.itemClick=function (action)
        {
            switch (action){
                case 'music':
                    $state.go('music');
                    break;
                case 'air':
                    $state.go('air');
                    break;
                case 'light':
                    $state.go('light');
                    break;
            }
        };

    });

