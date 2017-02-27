/**
 * Created by liangdf on 2015/12/12.
 */
var httpModule = angular.module("httpModule", ['ionic']);

httpModule.service('dialogService', function ($ionicPopup , $rootScope) {

    var self = this;


    var debugFlag = true;

    this.log = function (str) {
        if (debugFlag == true) {
            console.log(str);
        }
    };

    //确认询问对话框-----------------------------------------------------------------------
    this.showConfirm = function (confirmConfig, callBack) {
        if (confirmConfig.cancelText == undefined) {
            confirmConfig.cancelText = '取消';
        }
        if (confirmConfig.okText == undefined) {
            confirmConfig.okText = '确定';
        }
        if (confirmConfig.warnFlag == undefined) {
            $rootScope.iconWarn = false;
        } else {
            $rootScope.iconWarn = confirmConfig.warnFlag;
        }
        var confirmPopup = $ionicPopup.confirm({
            subTitle: confirmConfig.showText,
            templateUrl: 'partials/confirm.html',
            cssClass: 'popupBody',
            cancelText: confirmConfig.cancelText, // String (default: 'Cancel'). The text of the Cancel button.
            cancelType: 'button-full button-light', // String (default: 'button-default'). The type of the Cancel button.
            okText: confirmConfig.okText, // String (default: 'OK'). The text of the OK button.
            okType: 'button-full button-light' // String (default: 'button-positive'). The type of the OK button.
        });
        confirmPopup.then(function (res) {
            if (callBack) {
                callBack(res);
            }
        });
    };
});


var inPC = false;                         //正在处于pc的开发环境
var hideHttpModuleLog = true;            //隐藏
function consoleLogHttpModule(msg){     //扩展了 console.log()
    //if(hideHttpModuleLog){
    //    return;
    //}
    //console.log("httpModule:   "+msg);
    hideHttpModuleLog||console.log("httpModule:   "+msg);
}

httpModule.run(["$rootScope",function ($rootScope) {
    consoleLogHttpModule("init \n\n");
}]);

httpModule.config(function ($httpProvider) {
    consoleLogHttpModule("config \n\n");

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
});

httpModule.service("httpService", function ($rootScope, $http, dialogService) {

    consoleLogHttpModule("service");

    var type;                           //家电类型
    var hostName=location.hostname;     //服务器名称
    var id;                             //虚拟ID
    var res;                            //返回的信息
    var deviceType;                     //设备类型
    var modelNo;                        //设备型号
    var deviceId;                        //设备ID与虚拟ID类同
    var userId;
    var platform = '';                  //平台的类型:android,other(含ios)
    var _isAndroid = navigator.userAgent.toLocaleLowerCase().indexOf('android') > -1;


    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    if(inPC){
        id = 17592196255211;
        hostName = "ce2.midea.com";
        consoleLogHttpModule("处于PC环境中，自动设置id和hostNam");
    }else{
        deviceType=GetQueryString("deviceType");
        modelNo=GetQueryString("modelNo");
        id = GetQueryString("virtualId");
        userId =GetQueryString("userId");
        deviceId=id;

        if(id){
            res="成功";
        }else{
            res="失败";
        }
        consoleLogHttpModule("自动获取 virtualId " + res);
        consoleLogHttpModule("id="+id+"\n\n"+'deviceType: '+deviceType+"\n\n"+'modelNo: '+modelNo);
    }

    if (_isAndroid) {
        platform = "android";
    } else {
        platform = "other";
    }


    this.config = function (applianceType, virtualId, modelNum, connectUrl) {


        if (applianceType) {
        type = applianceType;
            consoleLogHttpModule("手动设置了 品类代码：" + type);
        }

        if(virtualId){
            id = virtualId;
            consoleLogHttpModule("手动设置了virtualId："+ virtualId);
        }

        if (modelNum) {
            modelNo = modelNum;
            consoleLogHttpModule("手动设置了设备的型号：" + modelNo);
        }

        if(connectUrl){
            hostName = connectUrl;
            consoleLogHttpModule("手动设置了链接服务器的路径："+ connectUrl);
        }

        consoleLogHttpModule("\n\n");

        consoleLogHttpModule("家电类型："+ type);
        consoleLogHttpModule("虚拟ID："+ id);
        consoleLogHttpModule("设备的型号：" + modelNo);
        consoleLogHttpModule("服务器URL："+ hostName + "\n\n");
    };

    this.post = function (url, data, successCallBack,errorCallBack) {
        consoleLogHttpModule('In HTTP POST');
        consoleLogHttpModule(JSON.stringify(data));
        if(inPC){
            var ret = {
                errorCode:0
            };
            successCallBack(ret, 0, 0, 0);
        }else{
            //consoleLogHttpModule("在底层 post() 方法中");
            //console.log(data);
            //consoleLogHttpModule("自动增加时间戳");
            data.now = Date.parse(new Date());
            //{now : Date.parse(new Date())}
            //console.log(data);
            $http
                .post(url, data)
                .success(function (data, status, headers, config) {
                    //consoleLogHttpModule("success" + data);
                    successCallBack(data, status, headers, config);
                })
                .error(function (data, status, headers, config) {
                    //consoleLogHttpModule("error" + data);
                    errorCallBack(data, status, headers, config);
                })
            ;
        }
    };

    this.deviceWork = function (objJson,applianceType,successCallBack,errorCallBack) {

        console.log("deviceWork");

        if(id) {
            this.post(  'http://'+location.hostname+'/v1/device/work',
                //this.post(  'http://'+hostName+'/v1/device/work',

                {
                    'objJson': objJson,
                    'virtualId': id,
                    'deviceType':deviceType,
                    'modelNo':modelNo,
                    'applianceType': applianceType,
                    'platform': platform
                },
                successCallBack,
                errorCallBack);
        }else{
            console.log("id error!");
            console.log("id = "+ id);
        }
    };


    this.deviceWork2 = function (objJson,successCallBack,errorCallBack) {

        consoleLogHttpModule("deviceWork2");

        if(!type){
            consoleLogHttpModule("applianceType error!");
            consoleLogHttpModule("type = "+ type);
            consoleLogHttpModule("please call httpService.config('0xEX') in the controller");
            return;
        }

        if(!id){
            consoleLogHttpModule("virtualId error!");
            consoleLogHttpModule("id = "+ id);
            return;
        }


        objJson = JSON.stringify(objJson);
        //consoleLogHttpModule("objJson="+objJson);

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});

        this.post(  'http://'+hostName+'/v1/device/work', {
                'objJson': objJson,
                'virtualId': id,
                'deviceType':deviceType,
                'modelNo':modelNo,
                'applianceType': type,
                'platform': platform
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };
    this.deleteDiy = function (objJson,applianceType,successCallBack,errorCallBack) {

        consoleLogHttpModule("deleteDiy");

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});
        this.post(  'http://'+hostName+'/v1/device/diy/delete', {
                'virtualId': id,
                'deviceType':deviceType,
                'modelNo':modelNo,
                'userId':userId,
                'diyName':objJson.diyName,
                'diyId':objJson.diyId
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };

    this.setFavorite = function (objJson,applianceType,successCallBack,errorCallBack) {

        consoleLogHttpModule("setFavorite");

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});

        this.post('http://' + hostName + '/v1/delicious/setFavorite', {
                'virtualId': id,
                'deviceType':deviceType,
                'modelNo':modelNo,
                'userId':userId,
                'scheduleFlag': objJson.scheduleFlag,
                'cookMinTime': objJson.cookMinTime,
                'cookMaxTime': objJson.cookMaxTime,
                'menuIdType': objJson.menuIdType,
                'menuText':objJson.menuText,
              'menuId': objJson.menuId,
                'platform':platform,
                'applianceType':applianceType
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };
    this.changeDiy = function (objJson,applianceType,successCallBack,errorCallBack) {

        consoleLogHttpModule("changeDiy");

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});

        this.post(  'http://'+hostName+'/v1/device/diy/change', {
                'virtualId': id,
                'deviceType':deviceType,
                'modelNo':modelNo,
                'userId':userId,
                'diyName':objJson.diyName,
                'diyId':objJson.diyId,
                'scheduleFlag': objJson.scheduleFlag,
                'cookMinTime': objJson.cookMinTime,
                'cookMaxTime': objJson.cookMaxTime,
                'menuIdType': objJson.menuIdType,
                'platform':platform,
              'objJson': objJson.objJson
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };

    this.getEditDiy = function (objJson,applianceType,successCallBack,errorCallBack) {

        consoleLogHttpModule("getEditDiy");

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});

        this.post(  'http://'+hostName+'/v1/device/diy/edit', {
                'virtualId': id,
                'deviceType':deviceType,
                'modelNo':modelNo,
                'userId':userId,
                'diyName':objJson.diyName,
                'diyId':objJson.diyId
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };

    this.getDiyInit = function (objJson, applianceType, successCallBack, errorCallBack) {

        consoleLogHttpModule("getDiyInit");

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});

        this.post('http://' + hostName + '/v1/device/diy/init', {
                'virtualId': id,
                'deviceType': deviceType,
                'modelNo': modelNo
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };
    this.saveDiy = function (objJson,applianceType,successCallBack,errorCallBack) {

        consoleLogHttpModule("saveDiy");

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});

        this.post(  'http://'+hostName+'/v1/device/diy/save', {
                'virtualId': id,
                'deviceType':deviceType,
                'modelNo':modelNo,
                'userId':userId,
                'diyName':objJson.diyName,
                'scheduleFlag': objJson.scheduleFlag,
                'cookMinTime': objJson.cookMinTime,
                'cookMaxTime': objJson.cookMaxTime,
                'menuIdType': objJson.menuIdType,
                'platform':platform,
                'objJson': objJson.objJson
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };
    this.startDiy = function (objJson,applianceType,successCallBack,errorCallBack) {

        consoleLogHttpModule("getDiyInit");

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});
        this.post(  'http://'+hostName+'/v1/device/diy/start', {
                'virtualId': id,
                'deviceType':deviceType,
                'modelNo':modelNo,
                'userId':userId,
                'platform':platform,
              'objJson': objJson.objJson
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };
    this.getMenuList = function (objJson,applianceType,successCallBack,errorCallBack) {

        console.log("getMenuList");

        if(id) {
            var tags='';
            for( var i =0;i<objJson.tags.length;i++){
                tags+=objJson.tags[i]+',';
            }
            this.post(  'http://'+location.hostname+'/v1/device/getMenus',
                {
                    'tags': tags,
                    'offSet':objJson.offSet,
                    'count':objJson.count,
                    'virtualId': id,
                    'deviceType':deviceType,
                    'modelNo':modelNo,
                    'applianceType': applianceType,
                    'userId':userId
                },
                successCallBack,
                errorCallBack);
        }else{
            console.log("id error!");
            console.log("id = "+ id);
        }
    };

    this.getMenuList2 = function (tagArray, offSet, count, successCallBack, errorCallBack) {

        consoleLogHttpModule("getMenuList2");
        if (!deviceType) {
            consoleLogHttpModule("applianceType error!");
            consoleLogHttpModule("deviceType = " + deviceType);
            consoleLogHttpModule("please call httpService.config('0xEX') in the controller");
            return;
        }

        if (!id) {
            consoleLogHttpModule("virtualId error!");
            consoleLogHttpModule("id = " + id);
            return;
        }

        var tags = '';
        for (var i = 0; i < tagArray.length; i++) {
            tags += tagArray[i] + ',';
        }
        this.post('http://' + hostName + '/v1/device/getMenus',
            {
                'tags': tags,
                'offSet': offSet,
                'count': count,
                'virtualId': id,
                'deviceType': deviceType,
                'modelNo': modelNo,
                'applianceType': deviceType
            },
            successCallBack,
            errorCallBack
        );
    };

    this.getTags = function (objJson,applianceType,successCallBack,errorCallBack) {

        console.log("getTags");

        if(id) {

            this.post(  'http://'+location.hostname+'/v1/device/getTags',
                {
                    'virtualId': id,
                    'deviceType':deviceType,
                    'modelNo':modelNo,
                    'applianceType': applianceType
                },
                successCallBack,
                errorCallBack);
        }else{
            console.log("id error!");
            console.log("id = "+ id);
        }
    };

    this.deviceStatus = function (objJson,applianceType,successCallBack,errorCallBack) {

        console.log("deviceStatus");

        if(id) {

            this.post(  'http://'+location.hostname+'/v1/device/getWorkStatus',
                {
                    'objJson': objJson,
                    'virtualId': id,
                    'deviceType':deviceType,
                    'modelNo':modelNo,
                    'applianceType': applianceType
                },
                successCallBack,
                errorCallBack);
        }else{
            console.log("id error!");
            console.log("id = "+ id);
        }
    };

    this.deviceStatus2 = function (successCallBack, errorCallBack) {

        consoleLogHttpModule("deviceStatus2");

        if(!type){
            consoleLogHttpModule("applianceType error!");
            consoleLogHttpModule("type = "+ type);
            consoleLogHttpModule("please call httpService.config('0xEX') in the controller");
            return;
        }

        if(!id){
            consoleLogHttpModule("virtualId error!");
            consoleLogHttpModule("id = "+ id);
            return;
        }

        this.post(  'http://'+hostName+'/v1/device/getWorkStatus', {
                'virtualId': id,
                'applianceType': type
            },
            successCallBack,
            errorCallBack
        );
    };


    this.getDiyInit = function (objJson, applianceType, successCallBack, errorCallBack) {

        consoleLogHttpModule("getDiyInit");

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});

        this.post('http://' + hostName + '/v1/device/diy/init', {
                'virtualId': id,
                'deviceType': deviceType,
                'modelNo': modelNo
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };

    this.devicesTimeSync = function (objJson, applianceType, successCallBack, errorCallBack) {

        consoleLogHttpModule("devicesTimeSync");

        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});

        var nowTime = new Date();
        var hours = nowTime.getHours();
        var minutes = nowTime.getMinutes();
        this.post('http://' + hostName + '/v1/device/sync', {
                'virtualId': id,
                'deviceType': deviceType,
                'hours': hours,
                'minutes':minutes
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );

    };


    this.deviceList = function (successCallBack, errorCallBack) {

        consoleLogHttpModule("deviceList");

        this.post('http://' + hostName + '/v1/user/devicelist', {},
            successCallBack,
            errorCallBack
        );
    };
    this.deviceEdit = function (virtualId, deviceName, successCallBack, errorCallBack) {

        consoleLogHttpModule("deviceEdit");

        this.post('http://' + hostName + '/v1/device/' + virtualId + '/edit', {deviceName: deviceName},
            successCallBack,
            errorCallBack
        );
    };
    this.deviceDelete = function (virtualId, successCallBack, errorCallBack) {

        consoleLogHttpModule("deviceDelete");

        this.post('http://' + hostName + '/v1/device/' + virtualId + '/delete', {},
            successCallBack,
            errorCallBack
        );
    };
    this.deviceBind = function (sn, successCallBack, errorCallBack) {

        consoleLogHttpModule("deviceBind");

        this.post('http://' + hostName + '/v1/device/bind', {sn: sn},
            successCallBack,
            errorCallBack
        );
    };


    this.startFavourite = function (successCallBack, errorCallBack) {

        consoleLogHttpModule("startFavourite");

        if (!type) {
            consoleLogHttpModule("applianceType error!");
            consoleLogHttpModule("type = " + type);
            consoleLogHttpModule("please call httpService.config('0xEX') in the controller");
            return;
        }

        if (!id) {
            consoleLogHttpModule("virtualId error!");
            consoleLogHttpModule("id = " + id);
            return;
        }

        if (!modelNo) {
            consoleLogHttpModule("modelNo error!");
            consoleLogHttpModule("modelNo = " + modelNo);
            return;
        }


        //显示加载的动画
        //$ionicLoading.show({
        //    content: 'Loading',
        //    animation: 'fade-in',
        //    showBackdrop: true,
        //    maxWidth: 200,
        //    showDelay: 0
        //});


        this.post('http://' + hostName + '/v1/device/workFavourite', {
                'virtualId': id,
                'userId': userId,
                'modelNo': modelNo,
                'applianceType': type,
                'platform': platform
            },
            function (data, status, headers, config) {

                successCallBack(data, status, headers, config)
            },
            function (data, status, headers, config) {

                errorCallBack(data, status, headers, config)
            }
        );
    };


    this.getWorkTogetherList = function (obj, successCallBack, errorCallBack) {

        consoleLogHttpModule("togetherDevices");

        this.post('http://' + hostName + '/v1/user/togetherDevices', {userId: userId},
            successCallBack,
            errorCallBack
        );
    };
    this.startWorkTogether = function (obj, successCallBack, errorCallBack) {

        consoleLogHttpModule("startWorkTogether");
        this.post('http://' + hostName + '/v1/user/workTogether',
            {
                'userId': userId,
                'workDevices': obj.workDevices,
                'appointPeriods': obj.appointPeriods,
                'appointTime': obj.appointTime,
                'platform': platform
            },
            successCallBack,
            errorCallBack
        );
    };

    this.getLineData = function (obj, successCallBack, errorCallBack) {

        console.log("getLineData");

        if (id) {

            this.post('http://' + location.hostname + '/v1/device/getLineData',
                {
                    'menuId': obj.menuId,
                    'rice': obj.rice,
                    'taste': obj.taste,
                    'temp': obj.temp,
                    'altitude': obj.altitude,
                    'voltage': obj.voltage,

                    'virtualId': id,
                    'deviceType': deviceType,
                },
                successCallBack,
                errorCallBack);
        } else {
            console.log("id error!");
            console.log("id = " + id);
        }
    };
});