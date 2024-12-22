const { Server } = require('socket.io')
let io = null

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // ReactアプリのURL
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('クライアントが接続しました:', socket.id)

    socket.on('disconnect', () => {
      console.log('クライアントが切断しました:', socket.id)
    })
  })

  return io
}

const getSocketInstance = () => {
  if (!io) {
    throw new Error('Socket.io は初期化されていません')
  }
  return io
}

module.exports = { initializeSocket, getSocketInstance }
