/**
*demo:
 * <z-work-process
 z-progress="workCtrl.workProcess.progress"
 z-done="workCtrl.workProcess.done"
 z-background-picture-url="workCtrl.workProcess.backgroundPictureUrl"
 z-text-info="workCtrl.workProcess.textInfo"
 z-message="workCtrl.workProcess.message"
 z-subscript="workCtrl.workProcess.subscript"
 z-sub-text-info="workCtrl.workProcess.subTextInfo"
 z-process-color="workCtrl.workProcess.processColor"
 >
 </z-work-process>


 * //工作进度控件数据交互
 $scope.workCtrl.workProcess = {
            progress: 0,//工作进度 0-1
            done: false,//工作完毕,显示保温
            processColor: '#FF2023',//进度条颜色
            backgroundPictureUrl: "images/状态-制作中-统一icon.png",//工作背景图片
            textInfo: '预计完成时间',//顶部文本信息
            message: '',//中部文本信息
            subscript: '',//中部下标信息
            subTextInfo: '还需0分钟'//下部文本信息
        };
**/
'use strict';
angular.module('workProcess', [])
    .directive('zWorkProcess', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                progress:'=zProgress',
                done:'=zDone',
                backgroundPictureUrl:'=zBackgroundPictureUrl',
                textInfo:'=zTextInfo',
                message:'=zMessage',
                subscript:'=zSubscript',
                subTextInfo:'=zSubTextInfo',
                processColor:'=zProcessColor'
            },
            templateUrl: 'common/ui_components/workProcess/workProcess.html',
            controller:'workProcessCtrl'
        };
    })
    .controller('workProcessCtrl', function ($timeout, $scope) {
        $scope.showCircle=false;
        $timeout(function () {
            $scope.showCircle=true;
        },0);
    });