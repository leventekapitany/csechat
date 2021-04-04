const express = require('express')
const app = express()
const http = require('http')
const chalk = require('chalk')
const path = require('path')
const {body, validationResult} = require('express-validator')
const mongoose = require('mongoose')

const server = http.Server(app)
const io = require('socket.io')(server)

const models = require('./models')

const port = 5000

//admin namespace
const admin = io.of("/admin")

//admin page socket
let adminSocket

//admin listener
admin.on("connection", _adminSocket => {
    adminSocket = _adminSocket
    log("admin socket connected")
})

//basic listener
io.on("connection", clientSocket => {
    const socket = clientSocket
    log("socket connected")

    socket.onAny((eventName, ...args) => {
        log("event fired: " + eventName)
    })
})

//serve static folders
app.use(express.static('public'))
//form handling
app.use(express.urlencoded({extended: true}))
//json
app.use(express.json())



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
app.post(
    "/signup",
    body('username').isAlphanumeric(),
    body('username').isLength({min: 3}),
    body('password').isLength({min: 3}),
    (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.json({ errors: errors.array() })
        }

        const newUser = new models.User({
            username: req.body.username,
            password: req.body.password
        })
        newUser.save((err) => {
            if(err)
            {
                log(err)
                res.json("error")
            }else
            {
                log("user " + req.body.username + " created")
                res.json("success")
            }
        })
    }
)


//DATABASE
mongoose.connect('mongodb+srv://user0:user0@cluster0.kmkht.mongodb.net/chat?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(chalk.bgBlue("connected to database"))
})


server.listen(port, () => console.log("listening on port: " + port))

//log
const log = (message) => {
    console.log(chalk.bgGreen(message)) //console
    if(adminSocket) //admin page
    {
        adminSocket.emit("log", message)
    }
}