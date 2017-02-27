'use strict';

var app = angular.module('app', ['ionic', 'app.index', 'app.air','app.light', 'app.music', 'app.modifyDiy', 'app.mainService', 'timePicker','app.airConditionRemoteCtrl']);
app.config(function ($ionicConfigProvider) {//ionic router config
    $ionicConfigProvider.views.maxCache(5);//最大缓存
    $ionicConfigProvider.form.checkbox('circle');//checkbox style
    $ionicConfigProvider.form.toggle('large');//toggle style
    $ionicConfigProvider.spinner.icon('ios');//spinner style
});
app.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("index");//angular加载完成后跳转到菜谱页面
});
app.controller('InitCtrl', function ($scope, mainService) {
    //angular version
    console.log('angular version : ' + angular.version.full);

    $scope.mainService = mainService;//mainService 引用  其他页面继承该处
    $scope.innerWidth=window.innerWidth;

    $scope.mainService.resourceService.getWeather();//get weather

    //$scope.mainService.resourceService.startSynchronizeDeviceStatus($scope);//开启同步设备状态
    ////同步设备时间
    //$scope.mainService.resourceService.timeSync();
    ////加载菜单数据
    //$scope.mainService.resourceService.loadMenus(
    //    function () {
    //        if($scope.mainService.deviceConfigService.devConfig.hasDiy){//如果配置文件中规定有diy,则请求diy初始化数据
    //            $scope.mainService.resourceService.getDiyInitData();
    //        }
    //    }
    //);

});