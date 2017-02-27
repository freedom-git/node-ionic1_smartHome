'use strict';

angular.module('app.resourceService', ['httpModule', 'app.configService', 'app.routerManageService', 'toolService'])
    .config(function ($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = [function (data) {
        var param = function (obj) {

            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        //TODO:2016.1.19 张志君 对于数组和对象的传输格式修改 将【】 改为. 未经过测试 留此据以供出错时查询
                        //fullSubName = name + '[' + subName + ']';
                        fullSubName = name + '.' + subName;
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];
})
    .factory('resourceService', function (toolService,$http,$rootScope,configService) {

        var socket = window.io.connect(configService.config.serverAddress);
        var weather = {};
        var musicFileList=[];
        var musicStatus={musicIndex:0,status:'',mode:''};
        var airCtrl={
            temperature:{
                value:0,
                lowerLimit:25,
                upperLimit:27,
                autoCtrlStatus:false,
                airConditioningStatus:'off'},
            humidity:{value:0,lowerLimit:60,upperLimit:90,autoCtrlStatus:false}};
        var deviceStatus={
            airConditioner:{
                mode:'coldMode',
                windGrade:3,
                windAutoDirection:false,
                settingTem:25
            }
        };

        //get weather
        var getWeather = function () {
            $http.get(
                'https://api.heweather.com/x3/weather?cityid=CN101280800&key=09016c9deba941e39d7f0ebaab9db658'
            )
                .success(function (data) {
                    data=data['HeWeather data service 3.0'][0];
                    console.log('weatherData',data);
                    if (data.status == "ok") {
                        angular.merge(weather,data);
                    } else {
                        getError(data);
                    }
                })
                .error(function () {
                    connectionError();
                });

        };

        //$scope.click= function () {
        //    io.socket.emit('chatMessage', $scope.toggle);
        //};
        //$scope.changeMusic=function(music){
        //    if(music=='equality.mp3'){
        //        rio.socket.emit('chatMessage', 'back');
        //    }else{
        //        io.socket.emit('chatMessage', 'change');
        //    }
        //};

        socket.on('airCtrl', function(data){
            if(data.direction!=='up'&&data.direction!=='both'){return;}
            switch (data.event){
                case 'humidityUpdate':
                    airCtrl.humidity.value=data.humidity;
                    break;
                case 'temperatureUpdate':
                    airCtrl.temperature.value=data.temperature;
                    break;
                case 'temperatureAutoCtrlStatusUpdate':
                    airCtrl.temperature.autoCtrlStatus=data.temperatureAutoCtrlStatus;
                    break;
                case 'airConditioningStatus':
                    airCtrl.temperature.airConditioningStatus=data.airConditioningStatus;
                    break;
                default :
                    break;

            }
            console.log(JSON.stringify(data));
            $rootScope.$digest();
        });

        socket.on('musicCtrl', function(data){
            if(data.direction!=='up'&&data.direction!=='both'){return;}
            switch (data.event){
                case 'musicStart':
                    data.musicIndex?musicStatus.musicIndex=data.musicIndex:0;
                    musicStatus.status='playing';
                    break;
                case 'musicFileDir':
                    angular.merge(musicFileList, data.musicFileDir);
                    console.log(JSON.stringify(musicFileList));
                    break;
                case 'musicPaused':
                    musicStatus.status='paused';
                    break;
                case 'musicStop':
                    musicStatus.status='stop';
                    break;
                default :
                    break;
            }
            console.log(JSON.stringify(data));
            $rootScope.$digest();
        });

        socket.on('homeStatus', function(data){
            if(data.direction!=='up'&&data.direction!=='both'){return;}
            switch (data.event){
                case 'sendHomeStatus':
                    angular.merge(musicStatus,data.musicStatus);
                    angular.merge(airCtrl.temperature,data.temperature);
                    angular.merge(airCtrl.humidity,data.humidity);
                    angular.merge(deviceStatus.airConditioner,data.airConditioner);
                    break;
                default :
                    break;
            }
            console.log(JSON.stringify(data));
            $rootScope.$digest();
        });

        return {
            socket:socket,
            airCtrl:airCtrl,
            deviceStatus:deviceStatus,
            weather:weather,
            musicFileList:musicFileList,
            musicStatus:musicStatus,
            getWeather:getWeather
        };
    });

