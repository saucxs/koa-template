const {query} = require('../utils/db');

/* 通过用户名查找用户信息 user_info */
let findDataByName = function(name) {
  let sql = 'SELECT * FROM user_info WHERE name= ?'
  return query(sql, name)
}
/* 注册用户-未激活 */
let insertUser= function (value) {
  console.log(value, 'value====================');
  let sql = "insert into user_info(name, password, email) values(?,?,?)"
  return query(sql, value)
}

module.exports = {
    insertUser,
    findDataByName,
}