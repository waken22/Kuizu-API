const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').load()

const http = require('http').Server(app)
const io = require('socket.io')(http)


const passport = require('passport')
const bodyParser = require('body-parser')

const URL_DB = process.env.URL_DB
const PORT = process.env.PORT || 3005

const routesAuth = require('./routes/auth')
const routesPrivate = require('./routes/private')


// Loading database settings
const db = require('./config/db')
db.openUri(URL_DB)


// Parsing body requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ====== EXPRESS ======= //

app.use(cors())

app.use(passport.initialize())
app.use(routesAuth)
app.use(routesPrivate)


// ====== SOCKET ======= //

let messages = []
let users = []

io.on('connection', (socket) => {
  
  socket.on('new-user', (user) => {
    // Adding the socket id
    user.socket_id = socket.id
    users.push(user)
    const newUser = messages.push({ message: user.username + ' has joined', author: socket.id, connection: true  })
    console.log(users, 'new-user')
    io.sockets.emit('get-users', users)
  })

  socket.on('load-users', () => {
    io.sockets.emit('get-users', users)
  })

  socket.on('new-message', (message) => {
    messages.push(message)
    io.sockets.emit('chat-new-message', message)
  })

  socket.on('load-messages', () => {
    io.sockets.emit('chat-messages', messages)
  })

  socket.on('disconnect', () => {
    if (socket.id) {
      let auser = users.filter(function(user) {
        console.log(user.socket_id + ' <-s_id_user ' + socket.id + ' <-s_id')
        return user.socket_id == socket.id
      })
      console.log(auser)
      console.log(' <- auser')
      let user = auser[0]
      console.log(user, '<- let user')
      users = users.filter(function(user) {
        return user.socket_id !== socket.id
      })
      // only do things if exists in the array
      if(user) {
        messages.push({ message: user.username + ' has left', author: user.username, connection: true  })
        io.sockets.emit('chat-new-message', { message: user.username + ' has left', author: user.username, connection: true  })
        io.sockets.emit('get-users', users)
      }
    }
  })
})



http.listen(PORT)

console.log('Listening in this PORT... : ' + PORT)
