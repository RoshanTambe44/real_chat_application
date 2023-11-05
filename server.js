//express setup ----------------------------------------------

const express = require('express');
const { dirname } = require('path');

const socketIo = require('socket.io');

const app = express()
const server = require('http').createServer(app);
const io = socketIo(server)


const port = process.env.PORT || 4000

server.listen(port, () =>{console.log(`listening on port ${port}`)})

app.use(express.static(__dirname + "/public"))

app.get ('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html')
})


// app.use(express.static(__dirname + "/public"))

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + "/index.html");
  
  
// })

// app.listen(4000)

// ---------------------------------------------------------------


//Socket.io setup ------------------------------------------------




io.on('connection', (socket) => {
  console.log('A user connected');
    socket.on("message", (msg)=>{
      socket.broadcast.emit("message", msg)
    } )

});



