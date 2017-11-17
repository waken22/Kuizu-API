const app = require('http').createServer()

const cors = require('cors')

const io = module.exports.io = require('socket.io')(app)

let messages = []

const PORT = process.env.PORT || 3231

const SocketManager = require('./SocketManager')


app.use(cors())

io.on('connection', (socket) => {
  socket.on('new-message', (message) => {
      messages.push(message)
    io.sockets.emit('chat-message', messages)
    })
  socket.on('load-messages', () => {
    io.sockets.emit('chat-message', messages)
  })z
})

app.listen(PORT, () => {
  console.log('Connected to server, PORT : ' + PORT)
})