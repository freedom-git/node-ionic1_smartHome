/**
 *<z-header
 *  image="mainService.deviceConfigService.devConfig.deviceOnLineIcon"
    icon="mainService.deviceConfigService.devStatusConfig[mainService.resourceService.deviceStatus.curState].curWorkStatusImg"
    info="mainService.deviceConfigService.devConfig.deviceName"
    click-function="headerClickFunction()"
 ></z-header>


 <z-header
 image="modifyDiyCtrl.headerImage"
 info="menuItem.menuText"
 menu-img="menuItem.menuType"
 ></z-header>
 */
'use strict';
angular.module('header', [])
  .directive('zHeader', function () {
    return {
      restrict: 'E',
      replace:true,
      scope: {
        menuImg:'=',
        image: '=',
        icon: '=',
        info:'=',
        clickFunction: '&'
      },
      templateUrl: 'common/ui_components/header/header.html'
    };
  });