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
    },
    isAgree: { // 0未处理 1同意 2拒绝
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model('Friends', FriendsSchema)