/**
 *
 * <z-range
 *  z-id="{{name+id}}"
    z-min="1"
    z-max="10"
    z-value="value"
    z-step=1>
 </z-range>
 */
angular.module('z-range', ['ionic'])
  .directive('zRange', function () {
    return {
      restrict: 'E',
      scope: {
        realValue: '=zValue',
        rangeId: '@zId',
        min: '@zMin',
        max: '@zMax',
        step:'@zStep',
        position: '=zPosition',  //向外输出滚动百分比
        onReleaseCallBack: '&zOnReleaseCallback',
        onReleaseCallBackMark: '@zOnReleaseCallbackMark'
      },
      controller: "rangeController",
      templateUrl: 'common/ui_components/range/z-range.html'
    };
  })
  .directive('zPick', function () {

    return {
      restrict: 'E',
      scope: {
        value: '=zValue',
        pickId: '@zId',
        array: '=zArray'

      },
      controller: "pickController",
      templateUrl: 'common/ui_components/range/z-pick.html'
    };
  })
  .controller('pickController', function ($ionicScrollDelegate, $timeout, $scope) {
    $scope.length = $scope.array.length;
    var width, scrollWidth, scrollTimer, scrollMark = 0;

    $scope.onScroll = function () {
      if (scrollMark == 0) {
        if (scrollTimer) {
          $timeout.cancel(scrollTimer);
        }
        var scroll = scrollWidth - width;
        var newValue = Math.round($scope.length - 1 - (scroll - $ionicScrollDelegate.$getByHandle('handle' + $scope.pickId).getScrollPosition().left) / (scroll / ($scope.length - 1)));
        console.log(newValue);
        if ($scope.value != newValue) {
          $scope.value = newValue;
          //console.log($scope.value);
        }
        $scope.$evalAsync(angular.noop);
        scrollTimer = $timeout(function () {
          $scope.toPosition();
        }, 200);
      }
    };
    $scope.toPosition = function () {
      scrollMark = 1;
      $timeout(function () {
        scrollMark = 0;
      }, 500);
      var scroll = scrollWidth - width;
      $ionicScrollDelegate.$getByHandle('handle' + $scope.pickId).scrollTo(scroll - ($scope.length - 1 - $scope.value) * (scroll / ($scope.length - 1)), 0, true);
    };
    $scope.doInit = function () {
      angular.element(document).ready(function () {
        width = document.getElementById($scope.pickId).clientWidth;
        scrollWidth = document.getElementById('content' + $scope.pickId).clientWidth;
        $scope.toPosition();
      });
    };


  })
  .controller('rangeController', function ($ionicScrollDelegate, $timeout, $scope) {
    var mark = 1;
    $scope.onScroll = function () {
      var width = document.getElementById($scope.rangeId).clientWidth;
      var max = $scope.max;
      var min = $scope.min;
      $scope.position = (1 - (($ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId)
        .getScrollPosition().left) * 0.531241 / 0.47 / width));
      var newValue = (min * 1 + Math.round((max - min) * (1 - (($ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId)
          .getScrollPosition().left) * 0.531241 / 0.47 / width))));
      //console.log("nw:"+newValue+" max:"+$scope.max+" min:"+$scope.min+" with:"+width);
      if (!($scope.value == newValue))($scope.value = newValue);
      if ($scope.value < min) {
        $scope.value = min;
      }
      $scope.realValue=$scope.value*$scope.step;
      mark = 1;
    };
    $scope.onRelease = function () {

      $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId).scrollTo($scope.getPosition(), 0, false);

      $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId).freezeScroll(true);

      if (angular.isDefined($scope.onReleaseCallBackMark)) {
        $scope.onReleaseCallback();
        //console.log($scope.onReleaseCallback);
      }
      mark = 0;
    };
    $scope.onOutTouch = function () {
      if ($scope.value != $scope.max && $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId)
          .getScrollPosition().left == 0) {
        $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId).scrollTo($scope.getPosition(), 0, false);
        $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId).freezeScroll(false);
      }

    };
    $scope.onTouch = function () {
      $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId).freezeScroll(false);
    };
    $scope.getPosition = function () {
      var width = document.getElementById($scope.rangeId).clientWidth;
      var max = $scope.max;
      var min = $scope.min;
      $scope.position = ($scope.value - min * 1) / (max - min);
      var position = ((1 - ($scope.value - min * 1) / (max - min)) * width * 0.47 / 0.53);
      //console.log((1 - ($scope.value - min * 1) / (max - min)) * width*0.47/0.53);
      return position;
    };
    $scope.doInit = function () {
      angular.element(document).ready(function () {
        mark = 0;
        if(angular.isUndefined($scope.step)){$scope.step=1;}
        $scope.max=$scope.max/$scope.step;
        $scope.min=$scope.min/$scope.step;
        $scope.value=$scope.realValue/$scope.step;

        $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId).scrollTo($scope.getPosition(), 0, false);
        $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId).freezeScroll(true);

        //当max过大时，比如3000，range初始化时会出现同步问题，这里微调value，触发双向绑定，使range同步
        //var tempValue = $scope.value;
        //$scope.value = $scope.value * 1 + 0.01;
        //var back = $timeout(function () {
        //  $scope.value = Math.round(tempValue);
        //}, 0);
        //当max过大时，比如3000，range初始化时会出现同步问题，这里微调value，触发双向绑定，使range同步
      });
    };
    $scope.addOnClick = function (event) {
      var width = document.getElementById($scope.rangeId).clientWidth;
      var max = $scope.max;
      var min = $scope.min;
      var el = document.getElementById($scope.rangeId);
      for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
      $scope.value = Math.round((event.x - lx) / width * (max - min) + min * 1);
      if ($scope.value < min) {
        $scope.value = min;
      }
      if ($scope.value > max) {
        $scope.value = max;
      }
      $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId).scrollTo($scope.getPosition(), 0, false);
    };

    $scope.$watch('value', function () {
      if (mark == 0) {
        var max = $scope.max;
        var min = $scope.min;
        if ($scope.value * 1 < min * 1) {
          $scope.value = min;
        }
        if ($scope.value * 1 > max * 1) {
          $scope.value = max;
        }
        $ionicScrollDelegate.$getByHandle('handle' + $scope.rangeId).scrollTo($scope.getPosition(), 0, false);
        $scope.realValue=$scope.value*$scope.step;
      }
    });

   $scope.$watch('realValue', function () {
      if (mark == 0) {
        $scope.value=$scope.realValue/$scope.step;
      }
    });

  });