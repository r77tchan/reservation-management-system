const { Server } = require('socket.io')
const { verifyToken } = require('./jwtHelper')

let io = null

const users = new Map() // userId => socketId のマッピング

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // ReactアプリのURL
      methods: ['GET', 'POST'],
    },
  })
  // ユーザー接続
  io.on('connection', (socket) => {
    console.log('クライアントが接続しました:', socket.id)
    // クライアント接続時にNotificationContext.jsから送られてくるトークン
    socket.on('authenticate', (token) => {
      try {
        const decoded = verifyToken(token) // JWT を検証
        const userId = decoded.userId // デコードされた userId を取得
        users.set(userId, socket.id) // userId と socket.id をマッピング
        console.log(`ユーザー登録: ${userId} => ${socket.id}`)
      } catch (err) {
        console.error('JWT の検証に失敗(socket.js):', err.message)
        socket.disconnect() // 無効なトークンの場合、接続を切断
      }
    })
    // 切断時にマッピングを削除
    socket.on('disconnect', () => {
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId)
          console.log(`ユーザー切断: ${userId}`)
          break
        }
      }
    })
  })

  return io
}

// userId から socket.id を取得する関数
const getSocketIdByUserId = (userId) => {
  return users.get(userId)
}

const getSocketInstance = () => {
  if (!io) {
    throw new Error('Socket.io は初期化されていません')
  }
  return io
}

module.exports = { initializeSocket, getSocketInstance, getSocketIdByUserId }
