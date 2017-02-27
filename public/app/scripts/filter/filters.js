'use strict';
angular.module('filters', [])


    //for example,when input equal to 2,return 02.like the digital watch
    .filter('digitalWatchFormat', function () {
        return function (input) {
            if (input < 10) {
                return '0' + input;
            }
            else {
                return input;
            }
        }
    })
    //将分钟数转为"XX小时XX分钟"输出
    .filter('minuteToHourAndMinute', function () {
        return function (input) {
            if (Math.floor(input / 60) === 0) {
                return input + '分钟';
            }
            else {
                if ((input % 60) === 0) {
                    return input / 60 + '小时';
                } else {
                    return Math.floor(input / 60) + '小时' + input % 60 + '分钟';
                }
            }
        }
    })

    //拆分歌曲名
    .filter('splitMusicName', function () {
        return function (input) {
            if(!input){return {author:'',name:''}}
           // console.log(input);
            var beforeMoveMp3 = input.split(".");
            var afterMoveMp3='';
            for(var i=0;i<beforeMoveMp3.length-1;i++){
                afterMoveMp3+=beforeMoveMp3[i];
            }
           // console.log(afterMoveMp3);
            var beforeSplitauthorAndName=afterMoveMp3.split("_-_");
            //console.log(beforeSplitauthorAndName);
            var authorBeforemove_=beforeSplitauthorAndName[0];
            var nameBeforeMove_=beforeSplitauthorAndName[1];
            var author=authorBeforemove_.split("_").join(' ');
            var name=nameBeforeMove_.split("_").join(' ');
            return {author:author,name:name};
        }
    });

