
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

let messages = []

io.on('connection', (socket) => {
  socket.on('new-message', (message) => {
      messages.push(message)
    io.sockets.emit('chat-message', messages)
    })
  socket.on('load-messages', () => {
    io.sockets.emit('chat-message', messages)
  })
})
