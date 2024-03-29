const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const models = require('../models')
const log = require('../logger3')




router.post("/create_private_room",
    body('user1_id').isNumeric(),
    body('user2_id').isNumeric(),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() })
        }
        console.log("validation success")

        const room = new models.PrivateRoom({
            members: [
                req.body.user1_id, req.body.user2_id
            ]
        })

        room.save((err) => {
            if (err) {
                log(err)
                res.json("error")
            } else {
                log("private room created for ID:" + req.body.user1_id + " and ID:" + req.body.user2_id)
                res.json("success")
            }
        })
    }
)

router.post("/private_message",
    body('room').isNumeric(),
    body('sender').isNumeric(),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() })
        }

        const message = new models.PrivateMessage({
            room: req.body.room,
            sender: req.body.sender,
            message: {
                text: req.body.text
            }
        })

        message.save((err) => {
            if (err) {
                log(err)
                res.json("error")
            } else {
                log("message sent in room:" + req.body.room + " by ID:" + req.body.sender)
                res.json("success")
            }
        })
    }
)


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