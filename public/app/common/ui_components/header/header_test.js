describe('directive header', function () {
    var $compile,
        $scope,
        el,
        $el,
        $body = $('body'),
        simpleHtml = '<z-header  image="image" icon="icon" info="info" click-function="tapFunction()" ></z-header>',
        $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(angular.mock.module('templates', 'header'));
    //beforeEach(module('app/common/ui_components/header/header.html'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(function () {
        angular.mock.inject(function (_$compile_, _$rootScope_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            el = $compile(angular.element(simpleHtml))($scope)
        });
        $body.append(el);
        $rootScope.$digest();
        $el = $('.header');
    });
    afterEach(function () {
        $body.empty();
    });

    it('Should render the directive out in the dom', function () {
        expect($el.length).toEqual(1);
        //expect($el.html()).toContain('<div class="productIcon">');
    });
    it('Should render out the image when given in scope', function () {
        $scope.image= "imageURL";
        $scope.$digest();
        expect($el.find("img:eq(0)").attr("src")).toEqual('imageURL');
    });
    it('Should render out the icon when given in scope', function () {
        $scope.icon= "iconURL";
        $scope.$digest();
        expect($el.find("img:eq(1)").attr("src")).toEqual('iconURL');
    });
    it('Should render out the info when given in scope', function () {
        $scope.info="info";
        $scope.$digest();
        expect($el.find("p").text()).toEqual('info');
    });
    it('Should act when tap', function () {
        $scope.mark=0;
        $scope.tapFunction=function(){$scope.mark=1;};
        $scope.$digest();
        expect($scope.mark).toEqual(0);
        $el.click();
        $scope.$digest();
        expect($scope.mark).toEqual(1);
    });
});