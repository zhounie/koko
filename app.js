const Koa = require('koa')
const Router = require('./router/index')
const Mongoose = require('./data/index')
const { PORT } = require('./config/index')
const app = new Koa()
const http = require('http').Server(app.callback())
const IO = require('socket.io')(http)



app.use(Router.routes())
Mongoose(() => {
    IO.on('connection', (socket) => {
        console.log(123)
        socket.emit('news', {hello: 'world'})
        socket.on('msg', (msg) => {
            console.log('msg: ', msg)
        })
    })
    http.listen(PORT, {origins:'*'}, () => {
        console.log(`app run http://localhost:${PORT}`);
    }) 
})
