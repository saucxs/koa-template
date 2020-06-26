let userModel= require("../models/userInfo");
const md5 = require("md5");
const dbConfig = require('../config').db;
const {randomString, toNomalTime} = require('../utils/common');

let register = async (ctx, next) => {
    let user = {
        name: ctx.request.body.name,
        password: ctx.request.body.password,
        email: ctx.request.body.email
    }
    let salt = dbConfig.salt
    await userModel.findDataByName(user.name).then(res => {
        if(res.length) {
            ctx.body = {
                success: false,
                message: "用户名已经存在"
            }
        }else{
            let code =  md5(salt + randomString(64) +salt);
            userModel.insertUser([
                user.name,
                md5(salt + user.password + salt),
                user.email,
            ]);
            ctx.body = {
                success: true,
                message: "注册成功"
            };
        }
    })
}

module.exports = {
    register,
}
