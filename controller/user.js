const UserModel = require('../model/User')

const register = async (ctx) => {
    let params = ctx.request.body
    if (!params.userName || !params.password) {
        return ctx.body = {
            code: 301,
            msg: '参数不全'
        }
    }
    let user = new UserModel({
        userName: params.userName,
        password: params.password
    })
    try {
        await user.save()
        return ctx.body = {
            code: 200,
            msg: "注册成功"
        }
    } catch (error) {
        return ctx.body = {
            code: 301,
            msg: error
        }
    }
}

const login = async (ctx) => {
    let params = ctx.request.body
    if (!params.userName || !params.password) {
        return ctx.body = {
            code: 301,
            msg: '参数不全'
        }
    }
    await UserModel.findOne({
        userName: params.userName,
        password: params.password
    }, (err, data) => {
        if (err) {
            return ctx.body = {
                code: 301,
                msg: err
            }
        }
        if (!data) {
            return ctx.body = {
                code: 301,
                msg: '用户名或密码错误'
            } 
        }
        ctx.body = {
            code: 200,
            data: {
                id: data._id,
                userName: data.userName
            }
        }
    })
}


module.exports = {
    login,
    register
}