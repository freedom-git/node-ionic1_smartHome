// Invoke 'strict' JavaScript mode
'use strict';

var fs = require('fs');
// Create the chat configuration
module.exports = function(io, socket) {

    var musicFileDir=[];
    fs.readdir(__dirname +'/../../public/app/myMusic', function (err, files) {
        if (err) {
            throw new Error(err);
        }
        files.forEach(function (name) {
            musicFileDir.push(name);
        });
        console.log(JSON.stringify(musicFileDir));
        io.emit('musicCtrl',{event:'musicFileDir',musicFileDir:musicFileDir,direction:'both'} );
    });

    // Emit the status event when a new socket client is connected

    io.emit('memberManage', {event:'newMemberConnected',direction:'both'});


    socket.on('musicCtrl', function(data) {
        console.log('musicCtrl',data);

        // Emit the 'chatMessage' event
        io.emit('musicCtrl',data);
    });

    socket.on('homeStatus', function(data) {
        console.log('homeStatus',data);

        // Emit the 'chatMessage' event
        io.emit('homeStatus',data);
    });

    socket.on('airCtrl', function(data) {
        console.log('airCtrl',data);
        io.emit('airCtrl',data);
    });

    socket.on('lightCtrl', function(data) {
        console.log('lightCtrl',data);
        io.emit('lightCtrl',data);
    });

    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', function() {
        io.emit('chatMessage', {
            text: 'disconnected',
            username: 'freedom'
        });
		console.log('user disconnected');
    });
};
