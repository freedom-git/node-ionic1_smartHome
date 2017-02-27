'use strict';

angular.module('app.music', [])


    .config(function ($stateProvider) {
        $stateProvider
            .state('music', {
                url: '/music',
                templateUrl: 'pages/music/music.html',
                controller: 'MusicCtrl',
                resolve: {},
                cache: false,
                onEnter: function () {
                    console.log('music enter')
                },
                onExit: function () {
                    console.log('music exit')
                }
            });
    })

    .controller('MusicCtrl', function ($scope, resourceService,$ionicModal) {

        $scope.IndexCtrl={};
        $scope.resourceService=resourceService;
        $scope.musictoggle=false;
        $scope.controlButtonClicked= function () {
            if(resourceService.musicStatus.status=='playing'){
                resourceService.socket.emit('musicCtrl', {event:'MusicPause',direction:'down'});
                console.log("send:('musicCtrl', {event:'MusicPause',direction:'down'})");
            }else{
                resourceService.socket.emit('musicCtrl', {event:'MusicContinue',musicIndex:resourceService.musicStatus.musicIndex,direction:'down'});
                console.log("('musicCtrl', {event:'MusicContinue',musicIndex:resourceService.musicStatus.musicIndex,direction:'down'})");
            }
        };
        $scope.changeMusic=function(music){
            resourceService.socket.emit('musicCtrl', {event:'changeMusic',musicIndex:resourceService.musicFileList.indexOf(music),direction:'down'});
        };
        $scope.lastAndNext=function(direction){
            if(direction=='last'){
                resourceService.socket.emit('musicCtrl', {event:'lastMusic',direction:'down'});
            }
            if(direction=='next'){
                resourceService.socket.emit('musicCtrl', {event:'nextMusic',direction:'down'});
            }

        };
        $scope.stop= function () {
            resourceService.socket.emit('musicCtrl', {event:'stop',direction:'down'});
        };

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
    });