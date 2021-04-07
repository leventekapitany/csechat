const chalk = require('chalk')

let adminSocket

//log
const log = (message) => {
    console.log(chalk.bgGreen(message)) //console
    if(adminSocket) //admin page
    {
        adminSocket.emit("log", message)
    }else{
        console.log("adminSocket empty")
    }
}

module.exports = {
    log: log,
    adminSocket: adminSocket
}