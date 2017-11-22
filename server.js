
const io = require('socket.io')()
const PORT = process.env.PORT || 3231

let messages = []
var users = []

io.on('connection', (socket) => {
  users.push(socket.id)
  const newUser = messages.push({ message: socket.id + ' has joined', author: socket.id, connection: true  })
  io.sockets.emit('get-users', users)
  
  socket.on('new-message', (message) => {
      messages.push(message)
    io.sockets.emit('chat-new-message', message)
    })

  socket.on('load-messages', () => {
    io.sockets.emit('chat-messages', messages)
  })
  socket.on('disconnect', () => {
    if (socket.id) {
      users = users.filter(function(user) {
        return user !== socket.id
      })
      console.log(users)
      messages.push({ message: socket.id + ' has left', author: socket.id, connection: true  })
      io.sockets.emit('chat-new-message', { message: socket.id + ' has left', author: socket.id, connection: true  })
      io.sockets.emit('get-users', users)
    }
  })
})



io.listen(PORT)
console.log('Listening sockets on PORT... : ' + PORT)