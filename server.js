const express = require('express')
const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)



const PORT = process.env.PORT || 3231

const routes = require('./routes')



// ====== SOCKET ======= //

let messages = []
let users = []

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

// ====== EXPRESS ======= //

app.use(routes)



http.listen(PORT)

console.log('Listening in this PORT... : ' + PORT)
