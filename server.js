const express = require('express')
const app = express()
const http = require('http')
const chalk = require('chalk')
const path = require('path')
const mongoose = require('mongoose')
const server = http.Server(app)
const io = require('socket.io')(server)

const api = require('./api')
const Logger = require('./logger2')

const port = 5000
const dbConnection = "mongodb+srv://dbUser:Anusz6969@cluster0.nlq82.mongodb.net/chat?retryWrites=true&w=majority"

//LOGGER
const logger = new Logger()

//SOCKET
//admin namespace
const admin = io.of("/admin")

//admin page socket
let adminSocket

//admin listener
admin.on("connection", _adminSocket => {
    adminSocket = _adminSocket
    logger.adminSocket = adminSocket
    api.setAdminSocket(adminSocket)

    logger.log("admin socket connected")
})

//basic listener
io.on("connection", clientSocket => {
    const socket = clientSocket
    logger.log("socket connected")

    socket.onAny((eventName, ...args) => {
        logger.log("event fired: " + eventName)
    })
})

//serve static folders
app.use(express.static('public'))
//form handling
app.use(express.urlencoded({extended: true}))
//json
app.use(express.json())
//server api, http requests
app.use('/api', api.router)


//ROUTES
app.get("/admin", (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
})
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
app.get("/vue", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
})


//DATABASE
mongoose.connect(dbConnection,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(chalk.bgBlue("connected to database"))
})


server.listen(port, () => console.log("listening on port: " + port))

module.exports = {
    server: server,
    io: io
}