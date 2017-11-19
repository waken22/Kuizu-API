
const io = require('socket.io')()
const PORT = process.env.PORT || 3231

let messages = []
let users = []

io.on('connection', (socket) => {
  users.push(socket.id)
  const newUser = messages.push({ message: socket.id + ' has joined', author: socket.id, connection: true  })
  io.sockets.emit('new-user', newUser)
  
  socket.on('new-message', (message) => {
      messages.push(message)
    io.sockets.emit('chat-new-message', message)
    })

  socket.on('load-messages', () => {
    io.sockets.emit('chat-messages', messages)
  })

  socket.on('disconnect', () => {
    if (socket.id) {
      delete users[socket.id]
      messages.push({ message: socket.id + ' has left', author: socket.id, connection: true  })
      io.sockets.emit('chat-new-message', { message: socket.id + ' has left', author: socket.id, connection: true  })
    }
  })
})



io.listen(PORT)
console.log('Listening sockets on PORT... : ' + PORT)