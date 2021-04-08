let socket = null

const connect = (server) => {
    const io = require('socket.io')(server)

    io.on("connection", _socket => {
        socket = _socket
    })
}

module.exports = {
    socket: socket,
    connect: connect
}