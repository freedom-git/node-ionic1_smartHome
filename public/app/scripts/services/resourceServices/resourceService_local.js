'use strict';

angular.module('app.resourceService', [])
    .factory('resourceService', function () {
        //定义当前设备配置
        var menuList;
        var rowMenuList = {
            "errorCode": "0",
            "result": {
                "favoriteChecked": true,
                "menuList": [{
                    "buttonArr": [1, 2],
                    "cookMaxTime": 480,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 2,
                    "menuIdType": 1,
                    "menuText": "香甜煮",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuSweetCooking.png",
                    "priorityNum": 0,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10000&type=1",
                    "scheduleFlag": 1,
                    "settingFlag": [{
                        "defaultValue": 0,
                        "option": ["东北米", "丝苗米", "香米"],
                        "title": "米种"
                    }, {"defaultValue": 0, "option": ["适中", "偏软", "偏硬"], "title": "口感"}]
                }, {
                    "buttonArr": [1, 2, 4],
                    "cookMaxTime": 480,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 3,
                    "menuIdType": 1,
                    "menuText": "超快煮",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuQuickCooking.png",
                    "priorityNum": 1,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10001&type=1",
                    "scheduleFlag": 1,
                    "settingFlag": [{
                        "defaultValue": 0,
                        "option": ["东北米", "丝苗米", "香米"],
                        "title": "米种"
                    }, {"defaultValue": 0, "option": ["适中", "偏软", "偏硬"], "title": "口感"}]
                }, {
                    "buttonArr": [1, 2, 4],
                    "cookMaxTime": 480,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 5,
                    "menuIdType": 1,
                    "menuText": "稀饭",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuCongeeCooking.png",
                    "priorityNum": 2,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10003&type=1",
                    "scheduleFlag": 1,
                    "settingFlag": [{
                        "defaultValue": 0,
                        "option": ["东北米", "丝苗米", "香米"],
                        "title": "米种"
                    }, {"defaultValue": 0, "option": ["适中", "偏软", "偏硬"], "title": "口感"}]
                }, {
                    "buttonArr": [1, 2, 4],
                    "cookMaxTime": 480,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 6,
                    "menuIdType": 1,
                    "menuText": "煮粥",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuCongeeCooking.png",
                    "priorityNum": 3,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10004&type=1",
                    "scheduleFlag": 1,
                    "settingFlag": [{
                        "defaultValue": 120,
                        "range": {"max": 240, "min": 90, "step": 10, "unit": "分钟"},
                        "title": "烹饪时间"
                    }, {"defaultValue": 0, "option": ["东北米", "丝苗米", "香米"], "title": "米种"}, {
                        "defaultValue": 0,
                        "option": ["适中", "偏软", "偏硬"],
                        "title": "口感"
                    }]
                }, {
                    "buttonArr": [1, 2, 4],
                    "cookMaxTime": 480,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 8,
                    "menuIdType": 1,
                    "menuText": "蒸煮",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuSteamCooking.png",
                    "priorityNum": 4,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10026&type=1",
                    "scheduleFlag": 1,
                    "settingFlag": [{
                        "defaultValue": 30,
                        "range": {"max": 60, "min": 1, "step": 1, "unit": "分钟"},
                        "title": "烹饪时间"
                    }]
                }, {
                    "buttonArr": [4],
                    "cookMaxTime": 480,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 9,
                    "menuIdType": 1,
                    "menuText": "热饭",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuRiceCooking.png",
                    "priorityNum": 5,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10007&type=1",
                    "scheduleFlag": 0
                }, {
                    "buttonArr": [1, 4],
                    "cookMaxTime": 480,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 13,
                    "menuIdType": 1,
                    "menuText": "杂粮饭",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuRiceCooking.png",
                    "priorityNum": 6,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10030&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 2, 4],
                    "cookMaxTime": 480,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 12,
                    "menuIdType": 1,
                    "menuText": "煲仔饭",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuRiceCooking.png",
                    "priorityNum": 7,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10030&type=1",
                    "scheduleFlag": 1,
                    "settingFlag": [{
                        "defaultValue": 0,
                        "option": ["东北米", "丝苗米", "香米"],
                        "title": "米种"
                    }, {"defaultValue": 0, "option": ["适中", "偏软", "偏硬"], "title": "口感"}]
                }, {
                    "buttonArr": [1, 4],
                    "cookMaxTime": 480,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 26,
                    "menuIdType": 1,
                    "menuText": "小米粥",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuCongeeCooking.png",
                    "priorityNum": 8,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10030&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 4],
                    "cookMaxTime": 480,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 18,
                    "menuIdType": 1,
                    "menuText": "八宝粥",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuCongeeCooking.png",
                    "priorityNum": 9,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10016&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 2, 4],
                    "cookMaxTime": 480,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 7,
                    "menuIdType": 1,
                    "menuText": "煲汤",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuSoup.png",
                    "priorityNum": 10,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10030&type=1",
                    "scheduleFlag": 1,
                    "settingFlag": [{
                        "defaultValue": 120,
                        "range": {"max": 240, "min": 90, "step": 10, "unit": "分钟"},
                        "title": "烹饪时间"
                    }]
                }, {
                    "buttonArr": [255],
                    "cookMaxTime": 0,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 198,
                    "menuIdType": 1,
                    "menuText": "保温",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuDiy.png",
                    "priorityNum": 11,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10030&type=1",
                    "scheduleFlag": 0
                }, {
                    "buttonArr": [3, 4],
                    "cookMaxTime": 0,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10007,
                    "menuIdType": 2,
                    "menuText": "热饭",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10007.jpg",
                    "priorityNum": 12,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10007&type=1",
                    "scheduleFlag": 0
                }, {
                    "buttonArr": [3, 4],
                    "cookMaxTime": 45,
                    "cookMinTime": 45,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10008,
                    "menuIdType": 2,
                    "menuText": "蛋糕",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10008.jpg",
                    "priorityNum": 13,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10008&type=1",
                    "scheduleFlag": 0
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 120,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10000,
                    "menuIdType": 2,
                    "menuText": "香甜煮",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10000.jpg",
                    "priorityNum": 14,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10000&type=1",
                    "scheduleFlag": 1
                }],
                "offSet": 15,
                "supportDiy": true
            }
        };
        var addMenuList = {
            "errorCode": "0",
            "result": {
                "favoriteChecked": true,
                "menuList": [{
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10013,
                    "menuIdType": 2,
                    "menuText": "原味八宝饭",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10013.jpg",
                    "priorityNum": 15,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10013&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 120,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10030,
                    "menuIdType": 2,
                    "menuText": "白萝卜陈皮煲猪骨",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10030.jpg",
                    "priorityNum": 16,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10030&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10001,
                    "menuIdType": 2,
                    "menuText": "快速煮",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10001.jpg",
                    "priorityNum": 17,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10001&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10003,
                    "menuIdType": 2,
                    "menuText": "稀饭",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10003.jpg",
                    "priorityNum": 18,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10003&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 120,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10004,
                    "menuIdType": 2,
                    "menuText": "煮粥",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10004.jpg",
                    "priorityNum": 19,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10004&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [3, 4],
                    "cookMaxTime": 0,
                    "cookMinTime": 0,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10009,
                    "menuIdType": 2,
                    "menuText": "酸奶",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10009.jpg",
                    "priorityNum": 20,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10009&type=1",
                    "scheduleFlag": 0
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10014,
                    "menuIdType": 2,
                    "menuText": "锅巴",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10014.jpg",
                    "priorityNum": 21,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10014&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 120,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10016,
                    "menuIdType": 2,
                    "menuText": "黑八宝粥",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10016.jpg",
                    "priorityNum": 22,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10016&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10024,
                    "menuIdType": 2,
                    "menuText": "小米粥",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10024.jpg",
                    "priorityNum": 23,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10024&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10026,
                    "menuIdType": 2,
                    "menuText": "清蒸玉米",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10026.jpg",
                    "priorityNum": 24,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10026&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 60,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10027,
                    "menuIdType": 2,
                    "menuText": "红豆沙粥",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10027.jpg",
                    "priorityNum": 25,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10027&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 120,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10028,
                    "menuIdType": 2,
                    "menuText": "冬瓜瘦肉粥",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10028.jpg",
                    "priorityNum": 26,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10028&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 3, 4],
                    "cookMaxTime": 1440,
                    "cookMinTime": 120,
                    "diy": false,
                    "isDiy": false,
                    "menuId": 10029,
                    "menuIdType": 2,
                    "menuText": "鲜虾冬瓜粥",
                    "menuType": "http://ce3.midea.com:8080/menuPics/riceCooker/mainPics/10029.jpg",
                    "priorityNum": 27,
                    "redirectUrl": "http://ce3.midea.com/mdot/detail.html?userId=137806&menuId=10029&type=1",
                    "scheduleFlag": 1
                }, {
                    "buttonArr": [1, 4, 6, 7],
                    "cookMaxTime": 480,
                    "cookMinTime": 0,
                    "diy": true,
                    "isDiy": true,
                    "menuId": 460946721,
                    "menuIdType": 3,
                    "menuText": "好的",
                    "menuType": "http://ce2.midea.com/ceccs-control/cooker/images/menuDiy.png",
                    "priorityNum": 28,
                    "scheduleFlag": 1
                }],
                "offSet": 0,
                "supportDiy": true
            }
        };
        menuList = rowMenuList.result.menuList;

        var diyInit = {
            "errorCode": "0",
            "result": {
                "objJson": [{"data": {"dataContentses": []}, "sort": 1}, {
                    "data": {"dataContentses": []},
                    "sort": 2
                }, {"data": {"dataContentses": []}, "sort": 3}, {
                    "data": {"dataContentses": []},
                    "sort": 4
                }, {"data": {"dataContentses": []}, "sort": 5}, {"data": {"dataContentses": []}, "sort": 6}],
                "objTemplate": [{
                    "data": {
                        "groupName": "主料",
                        "maxCount": 10,
                        "template": {
                            "dataContents": [{
                                "data": {
                                    "max": 100,
                                    "min": 1,
                                    "name": "",
                                    "step": 0,
                                    "type": "range",
                                    "unit": "g",
                                    "value": 1
                                }, "sort": 1
                            }],
                            "templateType": "write"
                        }
                    }, "sort": 1
                }, {
                    "data": {
                        "groupName": "辅料",
                        "maxCount": 10,
                        "template": {
                            "dataContents": [{
                                "data": {
                                    "max": 100,
                                    "min": 1,
                                    "name": "",
                                    "step": 0,
                                    "type": "range",
                                    "unit": "g",
                                    "value": 1
                                }, "sort": 1
                            }],
                            "templateType": "write"
                        }
                    }, "sort": 2
                }, {
                    "data": {
                        "groupName": "步骤",
                        "maxCount": 12,
                        "template": {
                            "dataContents": [{
                                "data": {
                                    "max": 100,
                                    "min": 1,
                                    "name": "",
                                    "step": 0,
                                    "type": "range",
                                    "unit": "分钟",
                                    "value": 1
                                }, "sort": 1
                            }],
                            "templateOptions": [{
                                "data": [{
                                    "max": 20,
                                    "min": 1,
                                    "name": "搅拌",
                                    "step": 0,
                                    "unit": "分钟",
                                    "value": 10
                                }]
                            }, {
                                "data": [{
                                    "max": 60,
                                    "min": 1,
                                    "name": "松面",
                                    "step": 0,
                                    "unit": "分钟",
                                    "value": 10
                                }]
                            }, {
                                "data": [{
                                    "max": 50,
                                    "min": 1,
                                    "name": "揉面",
                                    "step": 0,
                                    "unit": "分钟",
                                    "value": 13
                                }]
                            }, {
                                "data": [{
                                    "max": 80,
                                    "min": 1,
                                    "name": "醒面",
                                    "step": 0,
                                    "unit": "分钟",
                                    "value": 16
                                }]
                            }, {
                                "data": [{
                                    "max": 120,
                                    "min": 1,
                                    "name": "发酵",
                                    "step": 0,
                                    "unit": "分钟",
                                    "value": 55
                                }]
                            }, {
                                "data": [{
                                    "max": 120,
                                    "min": 1,
                                    "name": "烘烤",
                                    "step": 0,
                                    "unit": "分钟",
                                    "value": 52
                                }, {"max": 200, "min": 140, "name": "温度", "step": 0, "unit": "度", "value": 173}]
                            }],
                            "templateType": "option"
                        }
                    }, "sort": 3
                }, {
                    "data": {
                        "groupName": "果料",
                        "maxCount": 1,
                        "template": {
                            "dataContents": [{
                                "data": {
                                    "max": 200,
                                    "min": 0,
                                    "name": "投料时间",
                                    "step": 0,
                                    "type": "range",
                                    "unit": "分钟",
                                    "value": 0
                                }, "sort": 1
                            }], "templateOptions": [], "templateType": "template"
                        }
                    }, "sort": 4
                }, {
                    "data": {
                        "groupName": "酵母",
                        "maxCount": 1,
                        "template": {
                            "dataContents": [{
                                "data": {
                                    "max": 200,
                                    "min": 0,
                                    "name": "投料时间",
                                    "step": 0,
                                    "type": "range",
                                    "unit": "分钟",
                                    "value": 0
                                }, "sort": 1
                            }], "templateOptions": [], "templateType": "template"
                        }
                    }, "sort": 5
                }, {
                    "data": {
                        "groupName": "保温",
                        "maxCount": 1,
                        "template": {
                            "dataContents": [{
                                "data": {
                                    "max": 6,
                                    "min": 1,
                                    "name": "保温时间",
                                    "step": 0,
                                    "type": "range",
                                    "unit": "小时",
                                    "value": 1
                                }, "sort": 1
                            }], "templateOptions": [], "templateType": "template"
                        }
                    }, "sort": 6
                }]
            }
        };

        var mark = {//mark
            recipesLoaded: false //recipes all loaded?
        };

        //infinite-scroll
        var addMoreMenus = function () {
            console.log('addMoreMenus');
            if (addMenuList.result.menuList.length && mark.recipesLoaded == false) {
                Array.prototype.push.apply(menuList, addMenuList.result.menuList);
                if (addMenuList.result.offSet == 0) {
                    mark.recipesLoaded = true;
                }
                addMenuList.result.menuList = [];
                if (addMenuList.result.favoriteChecked == true) {
                    menuList[0].isFavorite = true;
                    console.log('添加最爱');
                }
                console.log('moreMenus', menuList);
            }

        };

        return {
            mark: mark,
            menuList: menuList,
            diyInit:diyInit,
            addMoreMenus: addMoreMenus
        };
    });

