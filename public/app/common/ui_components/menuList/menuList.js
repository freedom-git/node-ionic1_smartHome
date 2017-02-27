/**
 * Created by zzj on 2016/04/08.
 * directive:menuList
 * demo:
 *    <z-menu-list menu-list="mainService.resourceService.menuList" menu-click-function="menuClickFunction"></z-menu-list>
 */
angular.module('menuList', [])
    .directive('zMenuList', function () {
        return {
            restrict: 'E',
            replace:false,
            scope: {
                menuList: '=',
                menuClickFunction: '&'
            },
            templateUrl: 'common/ui_components/menuList/menuList.html'
        };
    });