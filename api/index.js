require('dotenv').config();
const server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.API_PORT || 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.sockets.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

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

    var clientsInRoom = io.sockets.adapter.rooms.get(room);
    var numClients = clientsInRoom ? clientsInRoom.size : 0;
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
    socket.leave(roomId);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
