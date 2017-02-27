/**
 * <z-detail-range
 ng-if="detailSetting.range"
 z-name="{{detailSetting.title}}"
 z-value="detailSetting.defaultValue"
 z-max="{{detailSetting.range.max}}"
 z-min="{{detailSetting.range.min}}"
 z-unit="{{detailSetting.range.unit}}"
 z-step="{{detailSetting.range.step}}"
 z-id="{{detailSetting.$$hashKey}}"
 z-has-card="true"
 ></z-detail-range>
 */
'use strict';
angular.module('detailRange', ['z-range'])
    .directive('zDetailRange', function () {
        return {
            restrict: 'E',
            replace:true,
            controller:'DetailRangeCtrl',
            scope: {
                name:'@zName',
                value:'=zValue',
                unit:'@zUnit',
                max:'@zMax',
                min:'@zMin',
                step:'@zStep',
                id:'@zId',
                hasCard:'=zHasCard'
            },
            templateUrl: 'common/ui_components/detailRange/detailRange.html'
        };
    })
.controller('DetailRangeCtrl', function ($scope,$interval) {
    $scope.middle = function (min, max) {
        return Math.round((max * 1 + min * 1) / 2);
    };

    //detail range 加减按钮被按下
    var stop;
    $scope.detailRangeHold = function (add) {

        if (angular.isDefined(stop)) return;

        stop = $interval(function () {
            if (add) {
                $scope.value++;
            } else {
                $scope.value--;
            }
        }, 50);
    };

    //detail range 加减按钮松开
    $scope.detailRangeRelease = function () {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };

    //视图被摧毁时摧毁计时器
    $scope.$on('$destroy', function () {
        $scope.detailRangeRelease();
    });

});