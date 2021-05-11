const express = require('express')
const app = express()
const http = require('http')
const chalk = require('chalk')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')



const server = http.Server(app)
const io = require('./socket').connect(server)
const api = require('./api')


const port = 5000
const dbConnection = "mongodb+srv://dbUser:Anusz6969@cluster0.nlq82.mongodb.net/chat?retryWrites=true&w=majority"

//CONFIG
//serve static folders
app.use(express.static('public'))
//form handling
app.use(express.urlencoded({extended: true}))
//json
app.use(express.json())


//sessions
app.use(session({
    secret: "asd",
    resave: false,
    saveUninitialized: true
}))


//server api, http requests
app.use('/api', api.router)

app.get("/", (req, res) => {
    //res.sendFile(__dirname + '/public/index.html');
    res.send("user logged in: " + req.user)
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