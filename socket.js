let io = null

const init = () => {
    console.log("init socketio object")
    //admin namespace
    const admin = io.of("/admin")
    module.exports.adminNamespace = admin

    //admin listener
    admin.on("connection", _adminSocket => {
        const log = require('./logger3')
        log("admin socket connected")
    })

    //basic listener
    io.on("connection", clientSocket => {
        const log = require('./logger3')
        const socket = clientSocket
        log("socket connected")

        socket.onAny((eventName, ...args) => {
            log("event fired: " + eventName)
        })
    })
}

const connect = (server = null) => {
    //ha már létre lett hozva a socketio object
    if (io) return io

    //ha most lesz létrehozva először (server.js file)
    io = require('socket.io')(server)
    init()
    
    return io
}

module.exports = {
    connect: connect,
    adminNamespace: null,
}