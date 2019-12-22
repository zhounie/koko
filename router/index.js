const Router = require('koa-router')()
const User = require('./user')

Router.use('/user', User)

module.exports = Router