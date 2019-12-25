const mongoose = require('../data/index').mongoose
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('User', UserSchema)