'use strict';

describe('menuAndDiy.js test',function(){

    beforeEach(angular.mock.module('ionic'));
  beforeEach(angular.mock.module('app.menuAndDiy'));

  describe('Unit test menuAndDiyCtrl:',function(){
    var myController,scope;
    beforeEach(angular.mock.inject(
        function($controller,$rootScope){
          scope=$rootScope.$new();
          myController=$controller('MenuAndDiyCtrl',{$scope:scope})
        }
    ));

    it('menuCtrl should be defined',function (){
      expect(myController).toBeDefined();
    });


  });
});