const chalk = require('chalk')

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