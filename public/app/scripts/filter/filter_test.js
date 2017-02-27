'use strict';
describe('filter.js test', function () {


    beforeEach(angular.mock.module('filters'));
    var $filter;

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));


    describe('digitalWatchFormat filter', function () {
        it('returns 02 when given 2', function () {
            var time = $filter('digitalWatchFormat')(2);
            expect(time).toEqual('02');
        });

        it('returns 12 when given 12', function () {
            var time = $filter('digitalWatchFormat')(12);
            expect(time).toEqual(12);

        });
    });


    describe('minuteToHourAndMinute filter', function () {
        it('returns 3小时 when given 180', function () {
            var time = $filter('minuteToHourAndMinute')(180);
            expect(time).toEqual('3小时');
        });

        it('returns 59分钟 when given 59', function () {
            var time = $filter('minuteToHourAndMinute')(59);
            expect(time).toEqual('59分钟');

        });

        it('returns 1小时8分钟 when given 68', function () {
            var time = $filter('minuteToHourAndMinute')(68);
            expect(time).toEqual('1小时8分钟');

        });
    });



});

