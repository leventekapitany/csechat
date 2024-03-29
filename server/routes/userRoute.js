const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const models = require('./models')
const log = require('./logger3')


router.post("/signup",
    body('username').isAlphanumeric(),
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 3 }),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() })
        }

        const newUser = new models.User({
            username: req.body.username,
            password: req.body.password
        })
        newUser.save((err) => {
            if (err) {
                log(err)
                res.send(err)
            } else {
                log("user " + req.body.username + " created")
                res.json("success")
            }
        })
    }
)

router.post('/login',
    (req, res) => {
        models.User.findOne({ username: req.body.username }, (err, user) => {

            let response = {
                status: '',
                description: ''
            }

            if (err) {
                response.status = 'error',
                    response.description = err
            }
            else if (!user || !(user.password === req.body.password)) {
                response.status = 'invalid'
            }
            else {
                //successful auth
                req.session.user_id = user._id

                response.status = 'ok'
                response.description = {
                    username: user.username,
                    _id: user._id
                }
            }

            res.send(response)
        })
    }
)

router.post("add_friend",
    body('username').isAlphanumeric(),
    body('username').isLength({ min: 3 }),
    (req, res) => {
        const validation = validate(res)
        if (validation.failed) return validation.response
    }
)

router.get("/", (req, res) => {

    if (!(req.session.asd)) {
        req.session.asd = 0
    }
    req.session.asd++

    //res.sendFile(__dirname + '/public/index.html');
    //res.send("userid: " + req.session.user_id)
    res.send("asd: " + req.session.asd)

    console.log(req.session)
})


const validate = (req) => {
    let failed = null
    let response = null

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        failed = true
        response = res.json({ errors: errors.array() })
    }

    return {
        failed: failed,
        response: response
    }
}

module.exports = {
    router: router,
    setAdminSocket: (adminSocket) => {
        logger.adminSocket = adminSocket
    }
}