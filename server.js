const express = require('express')

const PORT = process.env.PORT || 3231

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

io.listen(PORT)

console.log('Listening sockets on PORT : ' + PORT)
