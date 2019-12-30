const mongoose = require('../data/index').mongoose
const Schema = mongoose.Schema

const FriendsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    friendId: {
        type: String,
        required: true,
        unique: true
    }
})


module.exports = mongoose.model('Friends', FriendsSchema)