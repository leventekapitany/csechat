const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

autoIncrement.initialize(mongoose.connection);

const userSchema = Schema({
    _id : Number,
    username: {
        type: String,
        unique: true
    },
    password: String
})
userSchema.plugin(uniqueValidator);
userSchema.plugin(autoIncrement.plugin, "user")
const User = mongoose.model('user', userSchema)

const privateRoomSchema = Schema({
    _id: Number,
    members: [{
        type: String,
        ref: 'Usesfdsr'
    }]
})
privateRoomSchema.plugin(uniqueValidator);
privateRoomSchema.plugin(autoIncrement.plugin, "private_room")
const PrivateRoom = mongoose.model('private_room', privateRoomSchema)

const privateMessageSchema = Schema({
    message: {
        text: String
    },
    sender: {
        type: Number
    },
    privateRoom: {
        type: Number
    }
})
const PrivateMessage = mongoose.model('private_message', privateMessageSchema)

module.exports = {
    User: User,
    PrivateRoom: PrivateRoom,
    PrivateMessage: PrivateMessage 
 }