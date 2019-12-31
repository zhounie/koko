const Router = require('koa-router')
const router = new Router()
const { login, register, userList } = require('../controller/user')
const { friendList, addFriend, findFriend, friendRequest, agreeFriendRequest } = require('../controller/friends')

router
    .post('/login', login)
    .post('/register', register)
    .post('/userList', userList)
    .post('/friendList', friendList)
    .post('/addFriend', addFriend)
    .post('/addFriend', addFriend)
    .post('/findFriend', findFriend)
    .post('/friendRequest', friendRequest)
    .post('/agreeFriendRequest', agreeFriendRequest)

module.exports = router.routes()