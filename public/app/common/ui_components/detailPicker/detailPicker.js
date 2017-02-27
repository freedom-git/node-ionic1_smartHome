/**
 <z-detail-picker
 ng-if="detailSetting.option"
 z-name="{{detailSetting.title}}"
 z-options="detailSetting.option"
 z-value="detailSetting.defaultValue"
 z-id="{{detailSetting.$$hashKey}}"
 z-has-card="true"
 ></z-detail-picker>
 */
'use strict';
angular.module('detailPicker', ['z-range'])
    .directive('zDetailPicker', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                name:'@zName',
                options:'=zOptions',
                value:'=zValue',
                id:'@zId',
                hasCard:'=zHasCard'
            },
            templateUrl: 'common/ui_components/detailPicker/detailPicker.html'
        };
    });