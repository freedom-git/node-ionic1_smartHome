'use strict';
var config = require('./config'),
    mongoose=require('mongoose');

module.exports=function(){
    var db =mongoose.connect(config.db);
    require('../app/models/qrCode.server.model');
    return db;
};