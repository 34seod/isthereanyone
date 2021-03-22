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
    // sending to all clients in "game" room, including sender
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    console.log(...array);
  }

  socket.on('message', function(message, nickName) {
    console.log('message', message, nickName)
    log('Client said: ', message);
    // sending to all clients in "game" room except sender
    socket.to(roomId).emit('message', socket.id, message, nickName);
  });

  socket.on('messageTo', function(socketId, message, nickName) {
    log('Client said To: ', socketId, message);
    // sending to individual socketid (private message)
    io.to(socketId).emit('message', socket.id, message, nickName)
  });

  socket.on('create or join', function(room, nickName) {
    console.log('create or join')
    log('Received request to create or join room ' + room);

    var clientsInRoom = io.sockets.adapter.rooms.get(room);
    var numClients = clientsInRoom ? clientsInRoom.size : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 0) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id); // sending to the client

    } else if (numClients < 4) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.in(room).emit('join', room, socket.id, nickName); // sending to all clients in "game" room, including sender
      socket.join(room);
    } else {
      socket.emit('full', room); // sending to the client
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
    socket.leave(roomId);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    io.in(roomId).emit('message', socket.id, { type: 'bye' } );
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
