const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const Router = require('./router/index')
const Mongoose = require('./data/index').connect
const { PORT } = require('./config/index')
const app = new Koa()
const http = require('http').Server(app.callback())
const IO = require('socket.io')(http)

// app.use((ctx, next)=> {
//     next()
// })


app.use(BodyParser())
app.use(Router.routes())
let client = []
Mongoose(() => {
    IO.on('connection', (socket) => {
        socket.broadcast.emit('newConnection',{
            userName: socket.handshake.query.userName
        })
        
        client.push(socket)
        socket.on('out', (data) => {
            socket.broadcast.emit('receive', {
                userName: data.userName,
                message: data.message
            })
        })
        socket.on('disconnect', () => {
            socket.broadcast.emit('newDisconnect', {
                userName: socket.handshake.query.userName
            })
        })
        
    })
    http.listen(PORT, {origins:'*'}, () => {
        console.log(`app run http://localhost:${PORT}`);
    }) 
})
