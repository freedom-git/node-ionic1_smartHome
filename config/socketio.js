// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config');

// Define the Socket.io configuration method
module.exports = function(server,io) {
	// Intercept Socket.io's handshake request
    //io.use(function(socket, next) {
    //});
	
	// Add an event listener to the 'connection' event
    io.on('connection', function(socket) {
    	// Load the chat controller
        console.log('a user connected');
        require('../app/controllers/socket.server.controller')(io, socket);
    });
};