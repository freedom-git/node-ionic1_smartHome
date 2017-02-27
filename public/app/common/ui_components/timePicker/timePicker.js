/**
 * Created by vijanny on 2015/12/9.
 * mail:vijanny@126.com
 * directive:timePicker
 * demo:
 *   <time-picker
 *   show="mainService.timePicker.show"
 *   value="mainService.timePicker.value"
 *   call-back="mainService.timePicker.fun">
 *   </time-picker>
 *
 *var timePicker = {
            show: false,//是否显示预约控件
            value: {hideBySelf: false},
            fun: function (value) {//点击确定之后的触发事件
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
 */
angular.module('timePicker', ['ionic']).
directive('timePicker', function () {
        return {
            restrict: 'E',
            replace: 'true',
            scope: {
                value: '=',
                show: '=',
                callBack: '&'
            },
            controller:'timePickerCtrl',
            templateUrl: 'common/ui_components/timePicker/timePicker.html'
        };
    })
    .controller('timePickerCtrl', function ($scope,$timeout) {
        $scope.$watch('show', function () {
            //console.log('show in time-picker:' + $scope.show);
            if ($scope.show == true) {
                //$scope.scrollToNewTime({
                //    hours:0,
                //    minutes:0
                //});
                $scope.timePickerSet();
                if ($scope.value.hideBySelf != undefined) {
                    $scope.hideBySelf = $scope.value.hideBySelf;
                } else {
                    $scope.hideBySelf = false;
                }

            }
        });
        $scope.indexH = 0;
        $scope.indexM = 0;
        $scope.setHours = 0;
        $scope.setMinutes = 0;

        $scope.timePickerDialogSubTitle = '请设定您需要的完成时间';
        $scope.isTomorrow = false;

        //可选时间数组
        $scope.hours = [];
        $scope.Minus = [];

        //ldf:填充时间：小时
        for (var k = 0; k < 2; k++) {
            for (var i = 0; i < 24; i++) {
                $scope.hours.push(i);
            }
        }

        //ldf:填充时间：分
        for (var k = 0; k < 3; k++) {
            for (var j = 0; j <= 59; j++) {
                $scope.Minus.push(j);
            }

        }


        //ldf:小时滚动条初始化
        $scope.HourScroll = new iScroll("hourWrapper", {
            snap: 'li',                      //ldf:捕捉元素,SNAP功能是判断元素是否滑动到指定位置。通过这个效果可以制作花哨的跑马灯效果。
            vScrollbar: false,               //ldf:是否显示垂直滚动条
            hScrollbar: false,               //ldf:是否显示水平滚动条
            hScroll: false,                  //ldf:是否水平滚动
            onScrollEnd: function () {       //ldf:滚动停止后的回调
                $scope.isTomorrow = parseInt(Math.round((this.y / 30) * (-1)) / 24);

                //this.y：可理解为转动的角度吧。分辨率是30，除以30，求得转动的格数，乘以-1是为了取最近的整数。
                $scope.indexH = Math.round((this.y / 30) * (-1)) % 24;
                $scope.isTomorrow = $scope.indexH ==$scope.nowTimeHour?$scope.indexM<$scope.nowTimeMinute:$scope.indexH<$scope.nowTimeHour;


                $scope.$apply();
                $scope.HourScroll.refresh();
                //console.log("indexH:" + $scope.indexH);
            }
        });

        //ldf:分钟滚动条初始化
        $scope.MinuteScroll = new iScroll("minuteWrapper", {
            snap: 'li',
            vScrollbar: false,
            hScrollbar: false,
            hScroll: false,
            onScrollEnd: function () {
                $scope.indexM = Math.round((this.y / 30) * (-1)) % 60;
                $scope.isTomorrow = $scope.indexH ==$scope.nowTimeHour?$scope.indexM<$scope.nowTimeMinute:$scope.indexH<$scope.nowTimeHour;
                $scope.$apply();
                $scope.MinuteScroll.refresh();
                //console.log("indexM:" + $scope.indexM);
            }
        });

        //滚动到初始状态页面生成时滚动一次，避免回弹
        $scope.HourScroll.scrollToElement('li:nth-child(3)', 50);
        $scope.MinuteScroll.scrollToElement('li:nth-child(3)', 50);


        //ldf:滚动到指定时间,输入必须为{hours:xx,minutes:xx}格式
        $scope.scrollToNewTime = function (time) {
            $scope.HourScroll.refresh();                                 //重新计算固定滚动区域的内容高度
            $scope.MinuteScroll.refresh();

            //xxx.scrollToElement('li:nth-child(10)', 100)              //在100毫秒内滚动到第10个li元素的位置

            var hoursStr = 'li:nth-child(' + (time.hours + 1) + ')';
            var minuteStr = 'li:nth-child(' + (time.minutes + 60 + 1) + ')';


            $scope.HourScroll.scrollToElement(hoursStr, 100);
            $scope.MinuteScroll.scrollToElement(minuteStr, 100);
        };

        //ldf:滚动到现在时间
        $scope.scrollToNow = function () {

            //ldf:获取当前时间
            var nowTime = new Date();
            $scope.nowTimeHour = nowTime.getHours();
            $scope.nowTimeMinute = nowTime.getMinutes();
            console.log("nowH:" + $scope.nowTimeHour + " nowM:" + $scope.nowTimeMinute);

            //ldf:滚动到指定时间
            $scope.scrollToNewTime({
                hours: nowTime.getHours(),
                minutes: nowTime.getMinutes()
            });
        };

        //ldf:预约dialog激活入口
        $scope.timePickerSet = function () {
            //console.log('设置预约时间');
            $timeout(function () {
                $scope.scrollToNow();
            }, 250);
        };

        //预约dialog 确认键事件
        $scope.timePickerOkClick = function () {

            $scope.value.iResult=true;
            $scope.value.isTomorrow=$scope.isTomorrow;
            $scope.value.hour=$scope.indexH;
            $scope.value.minute=$scope.indexM;
            //console.log($scope.value);
            if ($scope.hideBySelf != true) {
                $scope.show = false;
            }
            $timeout(function () {
                $scope.callBack()($scope.value);
            }, 50);

        };
        //预约dialog 取消OR重置键事件
        $scope.timePickerResetlClick = function () {

            $scope.value.iResult=false;
            $scope.show = false;
            //$timeout(function () {
            //    $scope.callBack();
            //}, 50);
        };
    });
