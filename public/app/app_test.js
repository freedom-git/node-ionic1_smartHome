'use strict';


describe('app.js test',function(){
    beforeEach(angular.mock.module('app'));
    describe('Unit controlers:',function(){
        var myController,scope;
        beforeEach(angular.mock.inject(
            function($controller,$rootScope){
                scope=$rootScope.$new();
                myController=$controller('IndexCtrl',{$scope:scope})
            }
        ));

        //--------------test controller----------------------------//
        it('it should be myController',function (){
            expect(myController).toBeDefined();
         });

        //--------------test deviceConfigService----------------------------//
        it('deviceConfigService should be defined',function (){
            expect(scope.mainService.deviceConfigService).toBeDefined();
        });

        it('deviceConfigService.devConfig should be defined',function (){
            expect(scope.mainService.deviceConfigService.devConfig).toBeDefined();
        });

        it('deviceConfigService.devStatusConfig should be defined',function (){
            expect(scope.mainService.deviceConfigService.devStatusConfig).toBeDefined();
        });

        it('deviceConfigService.maps should be defined',function (){
            expect(scope.mainService.deviceConfigService.maps).toBeDefined();
        });

        it('deviceConfigService.buttonConfig should be defined',function (){
            expect(scope.mainService.deviceConfigService.buttonConfig).toBeDefined();
        });

        it('deviceConfigService.getDeviceErrorMessage should be defined',function (){
            expect(scope.mainService.deviceConfigService.getDeviceErrorMessage).toBeDefined();
        });

        //--------------test resourceService----------------------------//

        it('resourceService should be defined',function (){
            expect(scope.mainService.resourceService).toBeDefined();
        });

        it('resourceService.startSynchronizeDeviceStatus should be defined',function (){
            expect(scope.mainService.resourceService.startSynchronizeDeviceStatus).toBeDefined();
        });

        it('resourceService.loadMenus should be defined',function (){
            expect(scope.mainService.resourceService.loadMenus).toBeDefined();
        });

    });
});