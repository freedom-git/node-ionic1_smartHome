'use strict';

angular.module('app.configService', [])
    .factory('configService', function () {
        //定义当前设备配置
        var config= {
            serverAddress:'http://www.gephenom.com:3000'
        };
        return {
            config: config
        };

    });

