const Router = require('koa-router')
const router = new Router()
const { login, register } = require('../controller/user')

router
    .post('/login', login)
    .post('/register', register)

module.exports = router.routes()