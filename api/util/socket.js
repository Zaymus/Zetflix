const { env } = require('./constants');
let io;

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: env.BASE_URL,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"]
      }
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket IO not initialized!');
    }
    return io;
  }
}