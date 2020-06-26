const router = require('koa-router')();
const baseApi = require('../config').baseApi;
const verify = require('../middlewares/verify');
const login = require('../controllers/login');
const register = require('../controllers/register');

router.prefix(`/${baseApi}`)


router.post('/login', login) //登陆
router.post('/register', register.register) //登陆

console.log("router");

module.exports = router
