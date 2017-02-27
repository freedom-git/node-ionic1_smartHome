/**
 * Created by ldf on 2015/12/14.
 * mail:
 * directive:heatLine
 * demo:
 *   <div ng-controller="heatLineDemoCtrl">
 *       <heatline   elevation="curve.elevation"
 *                   temperature="curve.temperature"
 *                   taste="curve.taste"
 *                   riceType="curve.riceType"
 *                   voltage="curve.voltage"
 *                   step='curve.step'>
 *       </heatline>
 *       <br/><br/><br/>
 *  </div>
 */
angular.module('heatLine', []).directive("heatline", function () {
        return {
            restrict: 'AE',
            //Step:1 Prepare a dom for ECharts which (must) has size (width & hight)
            //Step:1 为ECharts准备一个具备大小（宽高）的Dom

            //template:
            //'<div>' +
            //    '<div id="main" style="height:300px;border:1px solid #ccc;padding:10px;"></div>' +
            //'</div>',
            //replace: true,

            //templateUrl: 'partials/heatline.html',
            templateUrl: 'common/ui_components/heatLine/heatLine.html',
            scope: {
                elevation: '='
                , temperature: '='
                , taste: '='
                , ricetype: '='
                , voltage: '='
                , step: '='
                , optimizedata: '='
                , normaldata: '='
            },

            link: function (scope, element, attrs) {
                //const CONST = {
                //    RICE_TYPE: {
                //        DBM: 0,      //东北米
                //        SMI: 1       //丝苗米
                //    },
                //    TASTE: {
                //        HARD: 0,     //偏硬
                //        NORMAL: 1,   //适中
                //        SOFT: 2      //偏软
                //    },
                //    //DEMO_DATA: [25, 50, 51, 50,         //吸水
                //    //            63, 81, 100, 100,       //加热
                //    //            101, 128, 112,        //沸腾
                //    //            107, 112, 103,        //焖饭
                //    //            90, 75, 73],          //保温
                //    DEMO_DATA: [25, 50, 51, 50,         //吸水
                //        66, 83, 100,            //加热
                //        102, 110, 128,          //沸腾
                //        111, 108, 100,           //焖饭
                //        90, 85, 73],          //保温
                //
                //    STAGE_END: {
                //        WATER_ABSORPTION: 3,           //吸水阶段最尾的数据位置
                //        HEATING: 6,                    //加热阶段最尾的数据位置
                //        BOLLING: 9,                      //沸腾阶段最尾的数据位置
                //        STEW_RICE: 12                      //焖饭阶段最尾的数据位置
                //    }
                //};

                //var modifyMethod = {
                //    time: function (normal,         //正常时间
                //                    modify,         //修正时间
                //                    index           //数据所在处
                //    ) {
                //
                //        var sub = 0;
                //
                //        if (normal > modify) {
                //            sub = normal - modify;
                //            scope.heatLine.eCharts.option.series[0].data[index] = CONST.DEMO_DATA[index] + sub * 2;       //提前完成
                //        } else {
                //            sub = modify - normal;
                //            scope.heatLine.eCharts.option.series[0].data[index] = CONST.DEMO_DATA[index] - sub * 2;       //延时完成
                //        }
                //        console.log("原来的数值：" + CONST.DEMO_DATA[index] + "，修正后的数值：" + scope.heatLine.eCharts.option.series[0].data[index]);
                //    },
                //    temperture: function (normal,         //正常温度
                //                          modify,         //修正温度
                //                          index           //数据所在处
                //    ) {
                //        var tmp = scope.heatLine.eCharts.option.series[0].data[index];
                //
                //        scope.heatLine.eCharts.option.series[0].data[index] = modify;
                //        console.log("原来的数值：" + tmp + "，修正后的数值：" + scope.heatLine.eCharts.option.series[0].data[index]);
                //    }
                //};
                //<start----------------------------        ----------------------------start>
                scope.heatLine = (function () {
                    return {
                        showLog: false,                  //隐藏 调试log
                        consoleLog: function (msg) {       //扩展了 console.log()
                            (scope.heatLine.showLog) && console.log("debug:   " + msg);
                        },
                        consoleLogObj: function (msg, data) {
                            (scope.heatLine.showLog) && console.log("debug:   " + msg + ",%o", data);
                        },
                        options: {
                            stepMax: 5,      //工作阶段的上限
                        },
                        eCharts: {
                            option: {
                                backgroundColor: '#F7FCFF',
                                //title : {                       //标题，每个图表最多仅有一个标题控件，每个标题控件可设主副标题。
                                //    text: '我的专属烹饪曲线',    //主标题文本，'\n'指定换行
                                //    textStyle:{
                                //        fontSize: 18,
                                //        fontWeight: 'bolder',
                                //        color: '#A1A2A4'
                                //    }
                                //},
                                legend: {
                                    show: false,
                                    orient: 'horizontal',
                                    data: ['优化曲线', '标准曲线'],
                                    y: 'bottom'
                                },
                                grid: {x: 8, y: 0, x2: 8, y2: 0},
                                xAxis: [                       //直角坐标系中横轴数组，数组中每一项代表一条横轴坐标轴，仅有一条时可省略数组。
                                    {
                                        type: 'category',
                                        position: 'bottom',
                                        boundaryGap: false,    //类目起始和结束两端空白策略，默认为 true 留空，false 则顶头
                                        axisTick: {              //坐标轴小标记:
                                            show: false          //不显示
                                        },
                                        splitLine: {             //分隔线
                                            show: false
                                        },
                                        //data : ['0', '1', '2', '3', '4', '5', '6', '7'], //类目列表
                                        data: ['', '', '', '', '', '', '', '',
                                            '', '', '', '', '', '', '', '',
                                            '', '', '', '', '', '', '', '',
                                            '', '', '', '', '', '', '', '',
                                            '', '', '', '', '', '', '', '',
                                            '', '', '', '', '', '', '', '',
                                            '', '', '', '', '', '', '', ''
                                        ], //类目列表
                                        axisLine: "false"
                                    },
                                    {
                                        type: 'category',        //坐标轴类型，横轴默认为类目型'category'，纵轴默认为数值型'value'
                                        position: 'top',
                                        boundaryGap: true,      //类目起始和结束两端空白策略，见下图，默认为 true 留空，false 则顶头
                                        axisTick: {                //坐标轴小标记:
                                            show: false           //不显示
                                        },
                                        splitLine: {             //分隔线
                                            show: false,
                                            lineStyle: {
                                                color: '#EBF2F8',
                                                width: 1,
                                                type: 'solid'
                                            }
                                        },
                                        splitArea: {
                                            show: true,
                                            areaStyle: {
                                                color: [
                                                    '#D0DBE1', '#D0DBE1', '#D0DBE1', '#D0DBE1', '#D0DBE1'
                                                ]
                                            }
                                        },
                                        data: [
                                            {
                                                value: '吸水',
                                                textStyle: {
                                                    color: '#CDD8DE',
                                                    align: 'center'
                                                }
                                            },
                                            {
                                                value: '加热',
                                                textStyle: {
                                                    color: '#CDD8DE',
                                                    align: 'center'
                                                }
                                            },
                                            {
                                                value: '沸腾',
                                                textStyle: {
                                                    color: '#CDD8DE',
                                                    align: 'center'
                                                }
                                            },
                                            {
                                                value: '焖饭',
                                                textStyle: {
                                                    color: '#CDD8DE',
                                                    align: 'center'
                                                }
                                            },
                                            {
                                                value: '保温',
                                                textStyle: {
                                                    color: '#CDD8DE',
                                                    align: 'center'
                                                }
                                            }
                                        ],//类目列表
                                        axisLine: "false"
                                    }
                                ],
                                yAxis: [
                                    {
                                        type: 'value',         //坐标轴类型，横轴默认为类目型'category'，纵轴默认为数值型'value'
                                        min: 0,
                                        max: 150,
                                        splitNumber: 6,
                                        splitLine: {
                                            show: false
                                        },
                                        axisLabel: {
                                            margin: -2,
                                            textStyle: {
                                                color: '#FFFFFF',
                                                align: 'left',
                                                baseline: "bottom"
                                            }
                                        },
                                        axisLine: {
                                            show: false
                                        }
                                    }
                                ],
                                series: [                          //驱动图表生成的数据内容数组，数组中每一项为一个系列的选项及数据，其中个别选项仅在部分图表类型中有效，
                                    {
                                        name: '优化曲线',            //系列名称，如启用legend，该值将被legend.data索引相关
                                        type: 'line',                //图表类型，必要参数！如为空或不支持类型，则该系列数据不被显示。可选为： 'line'（折线图） | 'bar'（柱状图） | 'scatter'（散点图） | 'k'（K线图） 'pie'（饼图） | 'radar'（雷达图） | 'chord'（和弦图） | 'force'（力导向布局图） | 'map'（地图）
                                        smooth: true,                //平滑曲线显示，
                                        symbol: 'none',
                                        itemStyle: {                //图形样式（详见itemStyle）
                                            normal: {
                                                color: '#0777F3'
                                                //areaStyle: {      //填充样式
                                                //    type: 'default'
                                                //}
                                            }
                                        },
                                        data: []
                                    },
                                    {
                                        name: '标准曲线',
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        itemStyle: {                //图形样式（详见itemStyle）
                                            normal: {
                                                color: '#D3D3D4'
                                                //areaStyle: {      //填充样式
                                                //    type: 'default'
                                                //}
                                            }
                                        },
                                        data: []
                                    }
                                ]
                            },
                            handler: null,
                            renew: function (option) {
                                if (scope.heatLine.eCharts.handler)
                                    scope.heatLine.eCharts.handler.setOption(option);
                            },
                            init: function (option) {

                                // Step:3 conifg ECharts's path, link to echarts.js from current page.
                                // Step:3 为模块加载器配置echarts的路径，从当前页面链接到echarts.js，定义所需图表路径
                                require.config(     //ldf:对模块的加载行为进行自定义
                                    {
                                        paths: {
                                            //echarts: 'scripts/echarts'      //为模块加载器配置echarts的路径，从当前页面链接到echarts.js所在目录
                                            echarts: 'http://echarts.baidu.com/build/dist'
                                        }
                                    }
                                );

                                // Step:4 require echarts and use it in the callback.
                                // Step:4 动态加载echarts然后在回调函数中开始使用，注意保持按需加载结构定义图表路径
                                require(
                                    [   //ldf:要加载的模块
                                        'echarts',
                                        'echarts/chart/line',
                                        //'echarts/chart/bar'
                                    ],
                                    function (ec) {     //ldf:加载完成后执行的回调函数
                                        scope.heatLine.eCharts.handler = ec.init(document.getElementById('main'));
                                        scope.heatLine.eCharts.renew(option);
                                    }
                                );
                            }
                        },
                        legend: {
                            data: {
                                cur: {
                                    optimize: {
                                        type: "optimize"
                                        , name: "优化曲线"
                                        , message: "根据你的所在地与选项优化烹饪口味:"   //显示的信息
                                        , data: scope.optimizedata                                //曲线数据
                                    },
                                    normal: {
                                        type: "normal"
                                        , name: "标准曲线"
                                        , message: "根据美的实验室得出的标准烹饪口味:"            //显示的信息
                                        , data: scope.normaldata                                       //曲线数据
                                    }
                                }
                            },
                            show: {                                              //当前显示图例的信息
                                type: ""
                                , message: ""                                     //显示的信息
                            },
                            click: function (legend) {                            //图例的点击回调函数
                                scope.heatLine.legend.show.type = legend.type;
                                scope.heatLine.legend.show.message = legend.message;
                            }
                        },
                        blink: {
                            enable: false,
                            period: 250,             //闪烁的周期，单位：ms
                            timerHandler: null,
                            double: false,
                            curStep: 0,              //当前步骤
                            lastStep: 0,              //上一步骤
                            init: function (step, eChartsOption) {
                                if (scope.heatLine.blink.enable === true) {
                                    scope.heatLine.blink.timerHandler = null;
                                    scope.heatLine.blink.double = false;
                                    scope.heatLine.blink.curStep = step;
                                    if (step != 0) {
                                        scope.heatLine.blink.lastStep = step - 1;
                                    } else {
                                        scope.heatLine.blink.lastStep = step;
                                    }

                                    scope.heatLine.consoleLog("初始化：curStep=" + scope.heatLine.blink.curStep);
                                    scope.heatLine.consoleLog("初始化：lastStep=" + scope.heatLine.blink.lastStep);

                                    scope.heatLine.blink.timerHandler = setInterval(function () {
                                        scope.heatLine.blink.double = !scope.heatLine.blink.double;
                                        scope.heatLine.consoleLog("闪烁：double=" + scope.heatLine.blink.double);
                                        scope.heatLine.consoleLog("闪烁：curStep=" + scope.heatLine.blink.curStep);
                                        scope.heatLine.consoleLog("闪烁：lastStep=" + scope.heatLine.blink.lastStep);
                                        if (scope.heatLine.blink.double) {
                                            scope.chagneStages(scope.heatLine.blink.lastStep, eChartsOption);
                                            scope.heatLine.eCharts.renew(eChartsOption);
                                        } else {
                                            scope.chagneStages(scope.heatLine.blink.curStep, eChartsOption);
                                            scope.heatLine.eCharts.renew(eChartsOption);
                                        }
                                        scope.$apply();
                                    }, scope.heatLine.blink.period);
                                }
                            },
                            watch: function (newStep) {
                                if (scope.heatLine.blink.enable === true) {
                                    if (scope.heatLine.blink.curStep != newStep) {
                                        scope.heatLine.consoleLog("工作阶段发生了变化");
                                        if (scope.heatLine.blink.curStep == scope.heatLine.options.stepMax) {
                                            scope.heatLine.consoleLog("上一个工作阶段为最尾的工作阶段,则当前的阶段为0，不显示");
                                            scope.heatLine.blink.lastStep = newStep;
                                            scope.heatLine.blink.curStep = newStep;
                                        } else {
                                            scope.heatLine.blink.lastStep = scope.heatLine.blink.curStep;
                                            scope.heatLine.blink.curStep = newStep;
                                        }
                                        scope.heatLine.consoleLog("上一阶段：" + scope.heatLine.blink.lastStep);
                                        scope.heatLine.consoleLog("当前阶段：" + scope.heatLine.blink.curStep);
                                    }
                                }
                            }
                        },
                        //CeCurveMake: function (elevation, temperature, taste, ricetype, voltage) {     //生成生活电器的曲线
                            //
                        //    ////吸水调整
                        //    //function waterAbsorption(elevation, temperature, taste, ricetype, voltage) {
                        //    //
                        //    //    //温度
                        //    //    if (temperature > 28) {
                        //    //        //标准是10分钟，需要9分钟完成
                        //    //        modifyMethod.time(10, 9, CONST.STAGE_END.WATER_ABSORPTION - 1);
                        //    //    } else if (temperature < 10) {
                        //    //        //标准是10分钟，需要12分钟完成
                        //    //        modifyMethod.time(10, 12, CONST.STAGE_END.WATER_ABSORPTION - 1);
                        //    //    } else {
                        //    //
                        //    //
                        //    //        //口感
                        //    //        if (taste == CONST.TASTE.HARD) {
                        //    //            //标准是10分钟，需要8分钟完成
                        //    //            modifyMethod.time(10, 8, CONST.STAGE_END.WATER_ABSORPTION - 1);
                        //    //        } else if (taste == CONST.TASTE.SOFT) {
                        //    //            //标准是10分钟，需要12分钟完成
                        //    //            modifyMethod.time(10, 12, CONST.STAGE_END.WATER_ABSORPTION - 1);
                        //    //        } else {
                        //    //
                        //    //
                        //    //            //米种
                        //    //            if (ricetype == CONST.RICE_TYPE.DBM) {
                        //    //
                        //    //                //标准是50度，需要40度
                        //    //                modifyMethod.temperture(50, 40, CONST.STAGE_END.WATER_ABSORPTION);
                        //    //                //scope.heatLine.eCharts.option.series[0].data[1] = 40;
                        //    //            }
                        //    //        }
                        //    //    }
                        //    //
                        //    //    scope.heatLine.eCharts.option.series[0].data[0] += 3;
                        //    //    scope.heatLine.eCharts.option.series[0].data[1] += 3;
                        //    //    scope.heatLine.eCharts.option.series[0].data[2] += 3;
                        //    //}
                        //    //
                        //    ////加热调整
                        //    //function heating(elevation, temperature, taste, ricetype, voltage) {
                        //    //
                        //    //    function modify(index, step) {
                        //    //        scope.heatLine.eCharts.option.series[0].data[index - 0] -= step;
                        //    //        scope.heatLine.eCharts.option.series[0].data[index - 1] -= step;
                        //    //        scope.heatLine.eCharts.option.series[0].data[index - 2] -= step;
                        //    //        //scope.heatLine.eCharts.option.series[0].data[index - 3] -= step;
                        //    //    }
                        //    //
                        //    //    //海拔,
                        //    //    //海拔和沸点:大致的规律是海拔高度每增加1.0km，水的沸点温度降低3.0℃)
                        //    //    if (elevation > 2500) {
                        //    //        modify(CONST.STAGE_END.HEATING, 1.5 * 5);
                        //    //    } else if (elevation > 2000) {
                        //    //        modify(CONST.STAGE_END.HEATING, 1.5 * 4);
                        //    //    } else if (elevation > 1500) {
                        //    //        modify(CONST.STAGE_END.HEATING, 1.5 * 3);
                        //    //    } else if (elevation > 1000) {
                        //    //        modify(CONST.STAGE_END.HEATING, 1.5 * 2);
                        //    //    } else if (elevation > 500) {
                        //    //        modify(CONST.STAGE_END.HEATING, 1.5 * 1);
                        //    //    } else {
                        //    //
                        //    //
                        //    //        //温度
                        //    //        if (temperature > 28) {
                        //    //            //标准是15分钟，需要14分钟完成
                        //    //            scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING + 1] += 3;
                        //    //            scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 0] += 3;
                        //    //            scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 1] += 3;
                        //    //            scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 2] += 3;
                        //    //            //scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 3] += 3
                        //    //        } else if (temperature < 10) {
                        //    //            //标准是15分钟，需要16分钟完成
                        //    //            scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 0] -= 3;
                        //    //            scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 1] -= 3;
                        //    //            scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 2] -= 3;
                        //    //            //scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 3] -= 5
                        //    //        } else {
                        //    //
                        //    //
                        //    //            //米种
                        //    //            if (ricetype == CONST.RICE_TYPE.DBM) {
                        //    //
                        //    //                //标准是15分钟，需要16分钟完成
                        //    //                //modifyMethod.time(15, 16, CONST.STAGE_END.HEATING - 1);
                        //    //                //scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 0] += 2;
                        //    //                scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 1] += 2;
                        //    //                scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 2] += 2;
                        //    //                //scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 3] += 2
                        //    //            } else {
                        //    //
                        //    //
                        //    //                //电压
                        //    //                if (voltage > 190) {
                        //    //
                        //    //                } else if (voltage > 170) {
                        //    //                    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 0] -= 5;
                        //    //                    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 1] -= 5;
                        //    //                    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 2] -= 5;
                        //    //                    //scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 3] -= 5
                        //    //                } else if (voltage > 150) {
                        //    //                    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 0] -= 10;
                        //    //                    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 1] -= 10;
                        //    //                    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 2] -= 10;
                        //    //                    //scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 3] -= 10
                        //    //                }
                        //    //            }
                        //    //        }
                        //    //
                        //    //        scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 0] += 2;
                        //    //        scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 1] += 2;
                        //    //        scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 2] += 2;
                        //    //        //scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.HEATING - 3] += 2
                        //    //    }
                        //    //
                        //    //}
                        //    //
                        //    ////沸腾调整
                        //    //function boiling(elevation, temperature, taste, ricetype, voltage) {
                        //    //
                        //    //    //口感
                        //    //    if (taste == CONST.TASTE.HARD) {
                        //    //        //标准是7分钟，需要5分钟完成
                        //    //        modifyMethod.time(7, 5, CONST.STAGE_END.BOLLING - 1);
                        //    //    } else if (taste == CONST.TASTE.SOFT) {
                        //    //        //标准是7分钟，需要9分钟完成
                        //    //        modifyMethod.time(7, 9, CONST.STAGE_END.BOLLING - 1);
                        //    //    } else {
                        //    //
                        //    //    }
                        //    //
                        //    //    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.BOLLING - 1] += 2;
                        //    //    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.BOLLING - 2] += 2;
                        //    //};
                        //    //
                        //    ////焖饭
                        //    //function stewRice(elevation, temperature, taste, ricetype, voltage) {
                        //    //    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.STEW_RICE - 0] -= 5;
                        //    //    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.STEW_RICE - 1] -= 5;
                        //    //    scope.heatLine.eCharts.option.series[0].data[CONST.STAGE_END.STEW_RICE - 2] -= 5;
                        //    //}
                            //
                        //    scope.heatLine.eCharts.option.series[1].data = scope.heatLine.legend.data.cur.optimize.data;  //更新数据
                        //    for (var i = 0; i < scope.heatLine.legend.data.cur.normal.data.length; i++) {
                        //        scope.heatLine.eCharts.option.series[0].data[i] = scope.heatLine.legend.data.cur.normal.data[i];
                            //    }
                            //
                        //    //waterAbsorption(elevation, temperature, taste, ricetype, voltage);
                        //    //heating(elevation, temperature, taste, ricetype, voltage);
                        //    //boiling(elevation, temperature, taste, ricetype, voltage);
                        //    //stewRice(elevation, temperature, taste, ricetype, voltage);
                        //},
                        CeCurveMake: function (optimizeData, normalData) {     //生成生活电器的曲线

                            if (optimizeData != undefined) {
                                scope.heatLine.eCharts.option.series[1].data = optimizeData;  //更新数据
                            }

                            if (normalData != undefined) {
                                scope.heatLine.eCharts.option.series[0].data = normalData;  //更新数据
                            }

                        },
                        mm: 0
                    }
                })();
                //工作阶段状态,常量
                scope.STAGE = {
                    WORKING: {
                        COLOR: "#C7EBF9",
                        STATUS: "working"
                    }
                    ,
                    WAIT: {
                        COLOR: "#F7FCFF",
                        STATUS: "wait"
                    }
                    ,
                    FINISH: {
                        COLOR: "#C7EBF9",
                        STATUS: "finish"
                    }
                };

                //定义各个工作阶段
                scope.stages = [
                    {
                        name: "吸水",
                        status: scope.STAGE.WAIT.STATUS
                    }
                    ,
                    {
                        name: "加热",
                        status: scope.STAGE.WAIT.STATUS
                    }
                    ,
                    {
                        name: "沸腾",
                        status: scope.STAGE.WAIT.STATUS
                    }
                    ,
                    {
                        name: "焖饭",
                        status: scope.STAGE.WAIT.STATUS
                    }
                    ,
                    {
                        name: "保温",
                        status: scope.STAGE.WAIT.STATUS
                    }
                ];

                //更改各个工作阶段状态
                scope.chagneStages = function (step, options) {

                    if (step < 0)return;
                    if (step > scope.heatLine.options.stepMax)return;
                    if (step == 0) {
                        //设置为等候的状态
                        for (var i = step; i < 5; i++) {
                            scope.stages[i].status = scope.STAGE.WAIT.STATUS;
                            options.xAxis[1].splitArea.areaStyle.color[i] = scope.STAGE.WAIT.COLOR;
                        }
                        return;
                    }
                    step = step - 1;

                    //设置为工作完的状态
                    for (var i = 0; i < step; i++) {
                        scope.stages[i].status = scope.STAGE.FINISH.STATUS;                       //设置图例颜色
                        options.xAxis[1].splitArea.areaStyle.color[i] = scope.STAGE.FINISH.COLOR;  //设置曲线背景色
                    }

                    //设置为工作中完的状态
                    scope.stages[step].status = scope.STAGE.WORKING.STATUS;
                    options.xAxis[1].splitArea.areaStyle.color[step] = scope.STAGE.WORKING.COLOR;

                    //设置为等候的状态
                    for (var i = step + 1; i < 5; i++) {
                        scope.stages[i].status = scope.STAGE.WAIT.STATUS;
                        options.xAxis[1].splitArea.areaStyle.color[i] = scope.STAGE.WAIT.COLOR;
                    }

                    //var outPut = "";
                    //for(var i=0;i<5;i++){
                    //    outPut += scope.stages[i].status + " ; ";
                    //}
                    //console.log("更改各个工作状态"+outPut);
                };


                //scope.heatLine.CeCurveMake(scope.elevation,
                //    scope.temperature,
                //    scope.taste,
                //    scope.ricetype,
                //    scope.voltage);
                scope.heatLine.CeCurveMake(scope.heatLine.legend.data.cur.optimize.data, scope.heatLine.legend.data.cur.normal.data);
                scope.heatLine.eCharts.init(scope.heatLine.eCharts.option);
                scope.heatLine.legend.click(scope.heatLine.legend.data.cur.optimize);   //初始化图例的数据


                scope.heatLine.blink.init(scope.step, scope.heatLine.eCharts.option);
                scope.$watch('step', function (newStep) {
                    scope.heatLine.blink.watch(newStep);
                    scope.chagneStages(newStep, scope.heatLine.eCharts.option);
                    scope.heatLine.eCharts.renew(scope.heatLine.eCharts.option);

                });


                //scope.$watchGroup(['elevation', 'temperature', 'taste', 'ricetype', 'voltage'], function (newData) {
                //
                //    var newElevation = newData[0];
                //    var newTemperature = newData[1];
                //    var newTaste = newData[2];
                //    var newRicetype = newData[3];
                //    var newVoltage = newData[4];
                //
                //    scope.heatLine.CeCurveMake(scope.elevation,
                //        scope.temperature,
                //        scope.taste,
                //        scope.ricetype,
                //        scope.voltage);
                //
                //    scope.heatLine.eCharts.renew(scope.heatLine.eCharts.option);
                //});

                scope.$watchCollection('normaldata', function (newVal, oldVal) {
                    scope.heatLine.CeCurveMake(undefined, newVal);
                    scope.heatLine.eCharts.renew(scope.heatLine.eCharts.option);
                });

                scope.$watchCollection('optimizedata', function (newVal, oldVal) {
                    scope.heatLine.CeCurveMake(newVal, undefined);
                    scope.heatLine.eCharts.renew(scope.heatLine.eCharts.option);
                });

                scope.heatLine.consoleLog("hello world");
            }
        }
    })
    .controller("heatLineDemoCtrl", ["$scope", "$timeout",
        function ($scope, $timeout) {

            $scope.curve = {
                elevation: 2,                //海拔
                temperature: 29,              //温度
                taste: 0,                    //口感
                riceType: 1,                 //米种           0:东北米               1:丝苗米
                voltage: 220,                //电压

                step: 5,                     //工作阶段

                optimizeData: [25, 50, 51, 50,         //吸水
                    66, 83, 100,            //加热
                    102, 110, 128,          //沸腾
                    111, 108, 100,           //焖饭
                    90, 85, 200],          //保温

                normalData: [0, 50, 51, 50,         //吸水
                    66, 83, 100,            //加热
                    102, 110, 128,          //沸腾
                    111, 108, 100,           //焖饭
                    90, 85, 73]          //保温
            };


            $scope.test = function () {
                setInterval(function () {

                    //console.log('\n\n\n');
                    //$scope.curve.elevation+=500;
                    //if ($scope.curve.elevation > 4000) {
                    //    $scope.curve.elevation = 0;
                    //}
                    //console.log('$scope.curve.elevation = ' + $scope.curve.elevation);

                    $scope.curve.riceType++;
                    if ($scope.curve.riceType > 3) {
                        $scope.curve.riceType = 0;
                    }
                    console.log('$scope.curve.riceType = ' + $scope.curve.riceType);

                    $scope.curve.taste++;
                    if ($scope.curve.taste > 2) {
                        $scope.curve.taste = 0;
                    }
                    console.log('$scope.curve.taste = ' + $scope.curve.taste);

                    $scope.curve.temperature += 10;
                    if ($scope.curve.temperature > 30) {
                        $scope.curve.temperature = 0;
                    }
                    console.log('$scope.curve.temperature = ' + $scope.curve.temperature);


                    $scope.curve.voltage += 10;
                    if ($scope.curve.voltage > 220) {
                        $scope.curve.voltage = 0;
                    }
                    console.log('$scope.curve.voltage = ' + $scope.curve.voltage);

                    $scope.curve.step++;
                    if ($scope.curve.step > 5) {
                        $scope.curve.step = 0;
                    }


                    $scope.curve.normalData[8] += 10;
                    if ($scope.curve.normalData[8] > 100) {
                        $scope.curve.normalData[8] = 0;
                    }
                    console.log(' $scope.curve.normalData[8] = ' + $scope.curve.normalData[8]);

                    $scope.$apply();

                }, 1000)
            };

            $scope.test();
            console.log("heat Line Demo...");
        }]
    );


