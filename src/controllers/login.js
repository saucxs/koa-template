const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const userModel = require("../models/userInfo");
const  md5 = require("md5");
const dbConfig = require('../config').db;
const { toNomalTime } = require('../utils/common');

module.exports = async (ctx, next) => {
    let name = ctx.request.body.name || "";
    let password = ctx.request.body.password || "";
    if (name === "" || password === "") {
        ctx.body = {
            success: false,
            message: "用户名或密码不能为空"
        };
        return ;
    }
    const alreadyRow = await userModel.findDataByName(name);
    const res = JSON.parse(JSON.stringify(alreadyRow));
    console.log(res, '-======')
    if (res.length > 0) {
        /*验证成功，服务端会签发一个token，token返回给客户端*/
        let salt = dbConfig.salt
        if (md5(salt + password + salt) === res[0]["password"]) {
            /*用户token*/
            const userToken = {
                name: name,
                id: res[0]["id"]
            };
            const token = jwt.sign(userToken, secret, {expiresIn: '7d'});
            ctx.body = {
                success: true,
                message: "登陆成功",
                token: token,
                userInfo: {
                    id: res[0]["id"],
                    name: res[0]["name"],
                    email: res[0]["email"],
                }
            }
        } else {
            ctx.body = {
                success: false,
                message: "用户名或密码错误"
            }
        }

    } else {
        ctx.body = {
            success: false,
            message: "用户名或密码错误"
        };
    }
}
