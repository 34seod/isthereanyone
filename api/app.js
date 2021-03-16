'use strict';

const port = process.env.PORT || 3001;
// const httpServer = require("http").createServer();
// const io = require("socket.io")(httpServer);

var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(port, function(){
  console.log('server is running on port ', port)
});

var io = socket(server); // ①

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // 편의상 *로 했지만 보안상 문제 있음
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


// httpServer.listen(port, () => {
//   console.log(`started on port: ${port}`);
// });


// io.on("connection", function() {
//   console.log("a user connected");
// });
io.sockets.on('connection', function(socket) {
  console.log("a user connected 1");

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    console.log('message', message)
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    // sending to all clients except sender
    socket.broadcast.emit('message', socket.id, message);
  });

  socket.on('messageTo', function(socketId, message) {
    log('Client said To: ', socketId, message);
    // for a real app, would be room-only (not broadcast)
    // sending to all clients except sender
    io.to(socketId).emit('message', socket.id, message)
  });

  socket.on('create or join', function(room) {
    console.log('create or join')
    log('Received request to create or join room ' + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 0) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);

    } else if (numClients < 4) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room, socket.id); // 나를 제외한 전원
      socket.join(room);
      socket.emit('joined', room, socket.id); // 나에게만
      io.sockets.in(room).emit('ready');
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });
});
