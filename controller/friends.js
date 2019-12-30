const FriendsModel = require('../model/Friends')
const UserModel = require('../model/User')
const addFriend = async (ctx) => {
    let params = ctx.request.body
    if ((params.friendId === params.userId) || !params.userId || !params.friendId) {
        return ctx.body = {
            code: 201,
            msg: "参数错误"
        }
    }
    try {
        let res = await UserModel.findOne({ _id: params.friendId })
        if (!res) {
            return ctx.body = {
                code: 301,
                msg: '用户不存在'
            }
        }
    } catch (error) {
        return ctx.body = {
            code: 301,
            msg: error
        }
    }
    
    let friend = new FriendsModel({
        userId: params.userId,
        friendId: params.friendId
    })
    await friend.save()
    return ctx.body = {
        code: 200,
        msg: "添加成功"
    }
}
const delFriend =  async (ctx) => {
    let params = ctx.request.body
}
const friendList = async (ctx) => {
    let params = {
        userId: ctx.request.body.userId
    }
    await FriendsModel.find(params, (err, data) => {
        if (err) {
            return ctx.body = {
                code: 300,
                msg: err
            }
        }
        return ctx.body = {
            code: 200,
            data: data.map(item => {
                return { userId: item.userId, friendId: item.friendId }
            })
        }
    })
}

const findFriend = async (ctx) => {
    let params = ctx.request.body
    if (!params.friendId) {
        return ctx.body = {
            code: 201,
            msg: "参数错误"
        }
    }
    try {
        let user = await UserModel.findOne({ _id: params.friendId })
        if (!user) {
            return ctx.body = {
                code: 301,
                msg: '用户不存在'
            }
        }
        return ctx.body = {
            code: 200,
            data: {
                userId: user._id,
                userName: user.userName
            }
        }
    } catch (error) {
        return ctx.body = {
            code: 301,
            msg: error
        }
    }
}

module.exports = {
    addFriend,
    delFriend,
    friendList,
    findFriend
}