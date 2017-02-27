'use strict';
var mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var qrCodeSchema=new Schema({
    qrCode:String,
    time:Number,
    times:Number
});

mongoose.model('qrCode',qrCodeSchema);