const chalk = require('chalk')
const admin = require('./socket').adminNamespace

const log = (message) => {
    console.log(chalk.bgGreen(message)) //console

    admin.emit("log", message)
}

module.exports = log


