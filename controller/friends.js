const FriendsModel = require('../model/Friends')
const UserModel = require('../model/User')

// 请求添加好友
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
        msg: "发送成功"
    }
}

// 删除好友
const delFriend =  async (ctx) => {
    let params = ctx.request.body
}

// 获取好友列表
const friendList = async (ctx) => {
    if (!ctx.request.body.userId) {
        return ctx.body = {
            code: 201,
            msg: "参数错误"
        }
    }
    let params = {
        userId: ctx.request.body.userId,
        isAgree: 1
    }
    let friends  = await FriendsModel.find(params, (err, data) => {
        if (err) {
            return ctx.body = {
                code: 300,
                msg: err
            }
        }
    })
    // 好友ID
    let friendIds =  friends.map(item => {
        return item.friendId
    })
    await UserModel.find({_id: friendIds}, (err, res) => {
        if(err) {
            return ctx.body = {
                code: 201,
                msg: "参数错误"
            }
        }
        return ctx.body = {
            code: 200,
            data: res
        }
    })
}

// 查找好友
const findFriend = async (ctx) => {
    let params = ctx.request.body
    if (!params.userName) {
        return ctx.body = {
            code: 201,
            msg: "参数错误"
        }
    }
    try {
        let user = await UserModel.findOne({ userName: params.userName })
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
                userName: user.userName,
                nikeName: user.nikeName,
                sex: user.sex,
                age: user.age,
                head: user.head
            }
        }
    } catch (error) {
        return ctx.body = {
            code: 301,
            msg: error
        }
    }
}

// 获取好友请求列表
const friendRequest = async (ctx) => {
    if(!ctx.request.body.userId) {
        return ctx.body = {
            code: 201,
            msg: "参数错误"
        }
    }
    let userId = ctx.request.body.userId
    let friends = await FriendsModel.find({ friendId: userId, isAgree: 0 }, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 301,
                msg: err
            }
        }
        return res
    })
    // 发送请求者Id
    let userIds = friends.map(item => {
        return item.userId
    })
    await UserModel.find({_id: userIds}, (err, data)=> {
        if (err) {
            return ctx.body = {
                code: 301,
                msg: err
            }
        }
        let res = JSON.parse((JSON.stringify(data)))
        for(let i = 0; i < res.length; i++) {
            for(let j = 0; j < friends.length; j++) {
                if (res[i]._id == friends[j].userId) {
                    res[i].requestId = friends[j]._id
                }
            }
        }
        return ctx.body = {
            code: 200,
            data: res
        }
    })
}

// 同意好友请求
const agreeFriendRequest = async (ctx) => {
    if(!ctx.request.body.requestId) {
        return ctx.body = {
            code: 201,
            msg: "参数错误"
        }
    }
    let friend = await FriendsModel.findOneAndUpdate({ _id: ctx.request.body.requestId}, { isAgree: 1 }, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 301,
                msg: err
            }
        }
    })
    let friendRequest = new FriendsModel({
        userId: friend.friendId,
        friendId: friend.userId,
        isAgree: 1
    })
    try {
        await friendRequest.save()
        return ctx.body = {
            code: 200,
            msg: '操作成功'
        }
    } catch (error) {
        return ctx.body = {
            code: 301,
            msg: error
        }
    }
}

// 拒绝好友请求
const refuseFriendRequest = async (ctx) => {
    if(!ctx.request.body.requestId) {
        return ctx.body = {
            code: 201,
            msg: "参数错误"
        }
    }
    FriendsModel.findOneAndUpdate({ _id: ctx.request.body.requestId}, { isAgree: 2 }, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 301,
                msg: err
            }
        }
        return ctx.body = {
            code: 200,
            msg: '操作成功'
        }
    })
}
module.exports = {
    addFriend,
    delFriend,
    friendList,
    findFriend,
    friendRequest,
    agreeFriendRequest,
    refuseFriendRequest
}