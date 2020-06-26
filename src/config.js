const baseApi = 'api/koa'
const db = {
    host: 'xx', // 数据库IP
    port: 3306, // 数据库端口
    database: 'koa-template', // 数据库名称
    user: 'xxx', // 数据库用户名
    password: 'xxxxxxx', // 数据库密码,
    salt: 'koa-template-sec',
}

const secret = 'koa-template-sec'

module.exports = {
    db,
	baseApi,
	secret,
}
