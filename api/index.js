require("dotenv").config();
const server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.API_PORT || 4000;

io.sockets.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  const { roomId } = socket.handshake.query;

  // Listen for new messages
  socket.on("newChatMessage", (data) => {
    io.in(roomId).emit("newChatMessage", data);
  });

  socket.on('message', function(message, nickname) {
    socket.to(roomId).emit('message', socket.id, message, nickname);
  });

  socket.on('roomStateShare', function(nickname, isScreenOn, isVoiceOn) {
    socket.to(roomId).emit('roomStateShare', socket.id, nickname, isScreenOn, isVoiceOn);
  });

  socket.on('messageTo', function(socketId, message, nickname) {
    io.to(socketId).emit('message', socket.id, message, nickname)
  });

  socket.on('create or join', function(room, nickname) {
    var clientsInRoom = io.sockets.adapter.rooms.get(room);
    var numClients = clientsInRoom ? clientsInRoom.size : 0;

    if (numClients === 0) {
      socket.join(room);
      io.sockets.adapter.rooms.get(room).isLock = false
      io.to(socket.id).emit('getin');
    } else if (!io.sockets.adapter.rooms.get(room).isLock) {
      io.to(socket.id).emit('getin');
      io.in(room).emit('join', socket.id, nickname);
      socket.join(room);
    } else {
      io.to(socket.id).emit('full');
    }
  });

  socket.on('lock', function() {
    if (io.sockets.adapter.rooms.get(roomId)) {
      io.sockets.adapter.rooms.get(roomId).isLock = !io.sockets.adapter.rooms.get(roomId).isLock;
      socket.to(roomId).emit('lock', io.sockets.adapter.rooms.get(roomId).isLock);
    }
  });

  socket.on('bye', function(){
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
  // console.log(`Listening on port ${PORT}`);
});
