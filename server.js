
const io = require('socket.io')()
const PORT = process.env.PORT || 3231

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
console.log('Listening sockets on PORT... : ' + PORT)