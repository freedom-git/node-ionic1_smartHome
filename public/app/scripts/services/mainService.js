'use strict';

angular.module('app.mainService',
    ['app.configService', 'app.resourceService', 'app.routerManageService', 'toolService', 'filters'])
    .factory('mainService',
        function (configService, resourceService, routerManageService, $rootScope, toolService, $ionicLoading,
            $ionicPopup,$filter,$timeout) {


            //control timePicker in index.html
            var timePicker = {
                show: false,//是否显示预约控件
                value: {hideBySelf: false},
                fun: function (value) {//点击确定之后的触发事件
                    //如果预约时间大于最大预约时间，弹出警告
                    if(resourceService.getAppointTime(value) > value.menuItem.cookMaxTime){
                        $ionicPopup.alert({
                            title: '预约时间过长',
                            template: '该菜谱的最大预约时间为'+$filter('minuteToHourAndMinute')(value.menuItem.cookMaxTime)
                        }).then(function () {
                            $timeout(function () {
                                timePicker.show = true;
                            },25);
                        });
                        return;
                    }
                    $ionicLoading.show({
                        template: '指令传输中...',
                        hideOnStateChange: true
                    });
                    resourceService.reservation(value, function (curstate) {//预约回调
                        routerManageService.stateGo('work');
                        if (curstate == deviceConfigService.maps.devStatus.COOKING) {
                            $ionicPopup.alert({
                                title: '提示',
                                template: '预约时间过短,设备已经开始工作'
                            });
                        }
                    })
                }
            };

            //加载页面控制对象
            var preparingPage = {preparing: false, mainMessage: '正在连接设备',subMessage:'应用加载成功'};

            return {
                configService: configService,
                resourceService: resourceService,
                routerManageService: routerManageService,
                toolService: toolService,
                timePicker: timePicker,
                preparingPage: preparingPage
            };
        });