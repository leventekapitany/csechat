const chalk = require('chalk')
const Server = require('./server')

Server.io.of("/admin").on("connection", _adminSocket => {
    console.log("logger2.js admin socket")
})

class Logger{
    constructor(adminSocket = null){
        this.adminSocket = adminSocket
    }

    log(message){
        console.log(chalk.bgGreen(message)) //console
        if(this)
        {
            if(this.adminSocket) //admin page
            {
                this.adminSocket.emit("log", message)
            }else{
                console.log("adminSocket empty")
            }
        }

    }
}

module.exports = Logger