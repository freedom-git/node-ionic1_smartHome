/**
 * <z-diy
 * diy-menu-data="mainService.resourceService.diyInit.diyMenuData"
 * diy-template="mainService.resourceService.diyInit.diyTemplate"
 * scroll-handle="menuAndDiyContent">
 * </z-diy>
 */
angular.module('z-diy', ['z-range'])
    .directive('zDiy', function () {
        return {
            restrict: 'E',
            scope:{
                diyTemplate:'=',
                diyMenuData:'=',
                scrollHandle:'@'
            },
            controller: "diyController",
            templateUrl: 'common/ui_components/diy/zDiy.html'
        };
    })
    .controller('diyController', function ($ionicScrollDelegate, $timeout, $scope, $ionicModal, $interval, $ionicPopup) {

        $scope.middle = function (min, max) {
            return Math.round((max * 1 + min * 1) / 2);
        };




        //add template to data

        $scope.add = function ($index) {
            switch ($scope.diyTemplate[$index].template.templateType) {
                case 'template':
                    var template = angular.fromJson(angular.toJson($scope.diyTemplate[$index].template.dataContents));
                    $scope.diyMenuData[$index].dataContentses.push({dataContents: template});
                    break;
                case 'option':
                    $scope.modalIndex = $index;
                    $scope.openModal();
                    break;
                case 'write':
                    $scope.modalIndex = $index;
                    $scope.tmp={name:''};
                    var myPopup = $ionicPopup.show({
                        template: '<input type="text" autofocus ng-model="tmp.name"><span style="color: red" ng-if="tmp.name.length >= 9">名称过长</span>',
                        title: '提示',
                        subTitle: '输入' + $scope.diyTemplate[$scope.modalIndex].groupName + '名称',
                        scope: $scope,
                        buttons: [
                            { text: '取消' },
                            {
                                text: '<b>添加</b>',
                                type: 'button-positive',
                                onTap: function(e) {
                                    if (!$scope.tmp.name) {
                                        e.preventDefault();
                                    } else {
                                        if($scope.tmp.name.length >= 9){
                                            e.preventDefault();
                                        }
                                        return $scope.tmp.name;
                                    }
                                }
                            }
                        ]
                    });
                    myPopup.then(function(res) {
                        $scope.tmp.name='';
                        if (angular.isDefined(res)) {
                                    var template = angular.fromJson(angular.toJson($scope.diyTemplate[$scope.modalIndex].template.dataContents));
                                    template[0].name = res;
                                    template[0].min = 1;
                                    template[0].max = $scope.diyTemplate[$scope.modalIndex].groupName == '主料'
                                        ? '500'
                                        : $scope.diyTemplate[$scope.modalIndex].groupName == '辅料'
                                        ? '100'
                                        : '250';
                                    template[0].unit = 'g';
                                    $scope.diyMenuData[$scope.modalIndex].dataContentses.push({dataContents: template});


                                } else {
                                    //$scope.showAlert('菜谱名称不能为空');
                                }
                    });



                    //$ionicPopup.prompt({
                    //    title: '提示',
                    //    subTitle: '输入' + $scope.diyTemplate[$scope.modalIndex].groupName + '名称',
                    //    inputType: 'text',
                    //    inputPlaceholder: '输入' + $scope.diyTemplate[$scope.modalIndex].groupName + '名称',
                    //    cancelText: '返回',
                    //    okText: '添加'
                    //
                    //}).then(function (res) {
                    //    if (angular.isDefined(res)) {
                    //        if (res == '') {
                    //            return false;
                    //
                    //            var toast=$ionicPopup.show({
                    //                title: '名称不能为空'
                    //            });
                    //            $timeout(function() {
                    //                toast.close();
                    //            }, 1000);
                    //
                    //            return;
                    //        }
                    //        if (res.length >= 9) {
                    //            var toast=$ionicPopup.show({
                    //                title: '名称过长'
                    //            });
                    //            $timeout(function() {
                    //                toast.close();
                    //            }, 1000);
                    //            return;
                    //        }
                    //        var template = angular.fromJson(angular.toJson($scope.diyTemplate[$scope.modalIndex].template.dataContents));
                    //        template[0].name = res;
                    //        template[0].min = 1;
                    //        template[0].max = $scope.diyTemplate[$scope.modalIndex].groupName == '主料'
                    //            ? '500'
                    //            : $scope.diyTemplate[$scope.modalIndex].groupName == '辅料'
                    //            ? '100'
                    //            : '250';
                    //        template[0].unit = 'g';
                    //        $scope.diyMenuData[$scope.modalIndex].dataContentses.push({dataContents: template});
                    //
                    //
                    //    } else {
                    //        //$scope.showAlert('菜谱名称不能为空');
                    //    }
                    //});
                    break;
                default:
                    //Statements executed when none of the values match the value of the expression
                    break;
            }
            $ionicScrollDelegate.$getByHandle($scope.scrollHandle).resize();

        };

        //diy range 加减按钮被按下
        var stop;
        $scope.diyRangeHold = function ($index1, $index2, $index3, add) {

            if (angular.isDefined(stop)) return;

            stop = $interval(function () {
                if (add) {
                    $scope.diyMenuData[$index1].dataContentses[$index2].dataContents[$index3].value++;
                } else {
                    $scope.diyMenuData[$index1].dataContentses[$index2].dataContents[$index3].value--;
                }
            }, 50);
        };

        //diy range 加减按钮松开
        $scope.diyRangeRelease = function () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };

        //视图被摧毁时摧毁计时器
        $scope.$on('$destroy', function () {
            $scope.diyRangeRelease();
        });


        $scope.delete = function ($index1, $index2) {
            var deletePopup = $ionicPopup.confirm({
                subTitle: '确定要删除' + $scope.diyTemplate[$index1].groupName + ($index2 == 0 ? $scope.diyMenuData[$index1].dataContentses.length > 1 ? '1' : '' : ($index2 + 1)) + '吗?',
                template: '<div class="confirmDialog"><img ng-src="images/tipAleart.png"> <p ng-bind-html="subTitle" ng-if="subTitle">{{subTitle}}</p></div>',
                cssClass: 'popupBody',
                cancelText: '取消',
                cancelType: 'button-full button-light',
                okText: '确定',
                okType: 'button-full button-light'
            });
            deletePopup.then(function (res) {
                if (res) {
                    $scope.diyMenuData[$index1].dataContentses.splice($index2, 1);
                }else {
                    console.log('You are not sure');
                }
            });
        };


        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });

        $scope.optionSelect = function ($index) {
            var template = angular.fromJson(angular.toJson($scope.diyTemplate[$scope.modalIndex].template.dataContents[0]));
            var templateArray = [];
            for (var i = 0; i < $scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data.length; i++) {
                var fillTemplate = angular.copy(template);
                if ($scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].name != undefined) {
                    fillTemplate.name = $scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].name;
                }
                if ($scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].min != undefined) {
                    fillTemplate.min = $scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].min;
                }
                if ($scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].max != undefined) {
                    fillTemplate.max = $scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].max;
                }
                if ($scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].unit != undefined) {
                    fillTemplate.unit = $scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].unit;
                }
                if ($scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].value != undefined) {
                    fillTemplate.value = $scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].value;
                }
                if ($scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].type != undefined) {
                    fillTemplate.type = $scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].type;
                }
                if ($scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].options != undefined) {
                    fillTemplate.options = $scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].options;
                }
                if ($scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].step != undefined) {
                    fillTemplate.step = $scope.diyTemplate[$scope.modalIndex].template.templateOptions[$index].data[i].step;
                }
                templateArray.push(fillTemplate);
            }
            $scope.diyMenuData[$scope.modalIndex].dataContentses.push({dataContents: templateArray});
            $scope.closeModal();

        };

        //angular.element(document).ready(function () {
        //
        //});
        //$scope.$on('$destroy', function () {
        //  $scope.diyMenuData=undefined;
        //  alert('destroy2');
        //});



    });