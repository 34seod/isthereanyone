require('dotenv').config();
const server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.API_PORT || 4000;

io.sockets.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  // socket.join(roomId);

  // Listen for new messages
  socket.on("newChatMessage", (data) => {
    // sending to all clients in "game" room, including sender
    io.in(roomId).emit("newChatMessage", data);
  });

  socket.on('message', function(message, nickname) {
    console.log('message', message, nickname)
    // sending to all clients in "game" room except sender
    socket.to(roomId).emit('message', socket.id, message, nickname);
  });

  socket.on('messageTo', function(socketId, message, nickname) {
    // sending to individual socketid (private message)
    io.to(socketId).emit('message', socket.id, message, nickname)
  });

  socket.on('create or join', function(room, nickname) {
    console.log('create or join')

    var clientsInRoom = io.sockets.adapter.rooms.get(room);
    var numClients = clientsInRoom ? clientsInRoom.size : 0;

    if (numClients === 0) {
      socket.join(room);
      io.sockets.adapter.rooms.get(room).isLock = false
    } else if (!io.sockets.adapter.rooms.get(room).isLock) {
      io.in(room).emit('join', room, socket.id, nickname); // sending to all clients in "game" room, including sender
      socket.join(room);
    } else {
      io.to(socket.id).emit('full');
    }
  });

  socket.on('lock', function() {
    io.sockets.adapter.rooms.get(roomId).isLock = !io.sockets.adapter.rooms.get(roomId).isLock;
    socket.to(roomId).emit('lock', io.sockets.adapter.rooms.get(roomId).isLock);
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
