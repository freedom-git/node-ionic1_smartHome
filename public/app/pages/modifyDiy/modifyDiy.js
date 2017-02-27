'use strict';

angular.module('app.modifyDiy', [])


    .config(function ($stateProvider) {
        $stateProvider
            .state('modifyDiy', {
                url: '/modifyDiy?menuItemJson',
                templateUrl: 'pages/modifyDiy/modifyDiy.html',
                controller: 'ModifyDiyCtrl',
                resolve: {},
                cache: true,
                onEnter: function () {
                    console.log('modifyDiy enter')
                },
                onExit: function () {
                    console.log('modifyDiy exit')
                }
            });
    })

    .controller('ModifyDiyCtrl', function ($scope, $stateParams,$ionicLoading,$ionicPopup) {
        //将参数传来的menuItem还原为对象
        $scope.menuItem = angular.fromJson($stateParams.menuItemJson);
        //如果用户刷新该页面则利用该方法重新获取diy数据
        if($scope.mainService.resourceService.diyModify.length===0){
            $scope.mainService.resourceService.getDiyModifyData($scope.menuItem);
        }
        //记录原菜谱名,以便于判断菜谱名有没有变化
        var oldName=$scope.menuItem.menuText;
        $scope.modifyDiyCtrl = {
            headerImage: 'images/menuOneSelfSaucer.png'//head上的白色圈
        };
        //--------------------------------按钮对应方法------------------------------------//
        //开始
        var startDiy= function () {
            if($scope.mainService.resourceService.getDiyMinCookTime($scope.mainService.resourceService.diyModify)===null){$scope.mainService.toolService.showToast('请至少添加一个步骤',1000);return;}
            $ionicLoading.show({
                template: '指令传输中...',
                hideOnStateChange:true
            });
            $scope.mainService.resourceService.startDiy($scope.mainService.resourceService.diyModify,function () {
                $scope.mainService.routerManageService.stateGo('work');
            });
        };
        //保存
        var saveModifyDiy= function () {
            if($scope.mainService.resourceService.getDiyMinCookTime($scope.mainService.resourceService.diyModify)===null){$scope.mainService.toolService.showToast('请至少添加一个步骤',1000);return;}
            if($scope.menuItem.menuText===''){$scope.mainService.toolService.showToast('菜谱名称不能为空',1000);return;}
            var deletePopup = $ionicPopup.confirm({
                subTitle: '您确定保存当前菜谱吗?<br/>原菜谱的数据将会被覆盖',
                template: '<div class="confirmDialog"><img ng-src="images/tipAleart.png"> <p ng-bind-html="subTitle" ng-if="subTitle">{{subTitle}}</p></div>',
                cssClass: 'popupBody',
                cancelText: '取消',
                cancelType: 'button-full button-light',
                okText: '确定',
                okType: 'button-full button-light'
            });
            deletePopup.then(function (res) {
                if (res) {
                    $scope.mainService.resourceService.saveModifyDiy($scope.menuItem,$scope.mainService.resourceService.diyModify,$scope.menuItem.menuText!=oldName,function () {
                        $scope.mainService.toolService.showToast('保存成功', 1250);
                        $scope.mainService.routerManageService.stateGo('menuAndDiy.menu', {}, {location: 'replace'});
                    });
                }else {
                    console.log('You are not sure');
                }
            });

        };
        //另存为
        var saveDiy = function () {
            if($scope.mainService.resourceService.getDiyMinCookTime($scope.mainService.resourceService.diyModify)===null){$scope.mainService.toolService.showToast('请至少添加一个步骤',1000);return;}
            $scope.modifyDiyCtrl.diyName='';
            var myPopup = $ionicPopup.show({
                template: '<input type="text" autofocus ng-model="modifyDiyCtrl.diyName"><span style="color: red" ng-if="modifyDiyCtrl.diyName.length >= 6">名称过长</span>',
                title: '提示',
                subTitle: '输入另存为菜谱名称',
                scope: $scope,
                buttons: [
                    { text: '取消' },
                    {
                        text: '<b>保存</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.modifyDiyCtrl.diyName) {
                                console.log('$scope.diyName:',$scope.modifyDiyCtrl.diyName);
                                e.preventDefault();
                            } else {
                                if($scope.modifyDiyCtrl.diyName.length >= 6){
                                    e.preventDefault();
                                }
                                return $scope.modifyDiyCtrl.diyName;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                if (angular.isDefined(res)) {
                    $scope.mainService.resourceService.saveDiy(res,$scope.mainService.resourceService.diyModify,function () {
                        $scope.mainService.toolService.showToast('保存成功', 1250);
                        $scope.mainService.routerManageService.stateGo('menuAndDiy.menu', {}, {location: 'replace'});

                    });
                } else {
                    //$scope.showAlert('菜谱名称不能为空');
                }
            });
        };
        //--------------------------------按钮对应方法------------------------------------//
        $scope.modifyDiyCtrl.buttonBar=[
            {text:'开始',icon:'ion-play',fun:startDiy},
            {text:'保存',icon:'ion-ios-list',fun:saveModifyDiy},
            {text:'另存为',icon:'ion-ios-folder',fun:saveDiy}
        ];
    });