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
    },
    nikeName: {
        type: String,
        default: 'KoKo'
    },
    sex: {
        type: Boolean,
        default: true
    },
    age: {
        type: Number,
        default: 18
    },
    head: {
        type: String
    }
})


module.exports = mongoose.model('User', UserSchema)