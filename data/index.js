const mongoose = require('mongoose')
const { MONGODB_HOST } = require('../config/index')

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


module.exports = {
    mongoose: mongoose,
    connect: (callback) => {
        mongoose.connect(MONGODB_HOST, OPTIONS)
        let db = mongoose.connection
        db.on('error', (err) => {
            console.log('error: ', err)
        })
        db.once('open', () => {
            console.log('mongoose connect success');
            callback()
        })
    }
} 