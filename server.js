// express setup
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = {};

io.on('connection', (socket) => {
  // Event to handle private messages
  socket.on('privateMessage', (targetSocketId, msg) => {

    const senderSocketId = socket.id;

    // io.to(targetSocketId).emit('privateMessage', msg, senderSocketId);
    // const chatRoomId = generateChatRoomId(socket.id, targetSocketId);

    io.to(targetSocketId).emit('joinRoom', chatRoomId);
    // console.log(chatRoomId);
    socket.join(chatRoomId);
    // io.to(chatRoomId).emit('`privateMessage', msg, socket.id);
  });

  // Log when a user joins a room
  // socket.on('joinRoom', (chatRoomId) => {
  //   console.log(`${socket.id} joined room ${chatRoomId}`);
  // });

  // Log when a private message is sent
  // socket.on('privateMessage', (targetSocketId, msg) => {
  //   console.log(`${socket.id} sent a private message to ${targetSocketId}`);
  // });




  // Event to handle online users
  socket.on('new-user', (username, userid) => {
    users[socket.id] = username;
    socket.broadcast.emit("new-user", username, userid);
    io.emit('user-list', users);
  });


  // Event to handle disconnected users
  socket.on('disconnect', () => {
    socket.broadcast.emit("user-disconnected", user = users[socket.id]);
    delete users[socket.id];
    io.emit('user-list', users);
  });
});


// Create function for unique id
function generateChatRoomId(socketId1, socketId2) {
  return `${socketId1}-${socketId2}`;
}
