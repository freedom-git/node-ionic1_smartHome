'use strict';
var express=require('express'),
    morgan=require('morgan'),
    bodyParser=require('body-parser'),
    http = require('http'),
    socketio = require('socket.io');

module.exports=function(){
    var app=express();
    var server = http.createServer(app);
    var io = socketio.listen(server);

    if(process.env.NODE_ENV==='development'){
        app.use(morgan('dev'));
    }
   // app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    //require('../app/routes/index.server.routes.js')(app);
    //require('../app/routes/qrCode.server.routes.js')(app);
    app.use(express.static(__dirname +'/../public/app'));
    require('./socketio')(server,io);
    return server;
};
