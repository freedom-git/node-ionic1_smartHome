'use strict';
angular.module('toolService', [])
    .factory('toolService', function ($ionicPopup,$timeout,$ionicScrollDelegate) {
        var showToast = function(message,time) {
            var myPopup = $ionicPopup.show({title: message});
            $timeout(function() {
                myPopup.close();
            }, time);
        };
        var scrollResize = function (handle) {
            $ionicScrollDelegate.$getByHandle(handle).resize();
        };
        var scrollToTop = function (handle,trueOrFalse) {
            $ionicScrollDelegate.$getByHandle(handle).scrollTop(trueOrFalse);
        };
        var scrollToBottom = function (handle,trueOrFalse) {
            $ionicScrollDelegate.$getByHandle(handle).scrollBottom(trueOrFalse);
        };
        return {
            showToast: showToast,
            scrollResize:scrollResize,
            scrollToTop:scrollToTop,
            scrollToBottom:scrollToBottom
        };
    });