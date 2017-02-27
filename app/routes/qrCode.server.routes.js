'use strict';
var qrCode=require('../controllers/qrCode.server.controller');
module.exports= function (app) {
    app.route('/qrCode').post(qrCode.inquireQrCode)
};