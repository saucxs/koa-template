const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
// const history = require("connect-history-api-fallback");
const router = require("./src/routes/index");
const { query } = require("./src/utils/db");
const compress = require('koa-compress');
const app = new Koa();

/*压缩*/
app.use(compress());

/*访问日志文件*/
const { logger, accessLogger } = require('./loggers');
app.use(accessLogger());

/*应用日志*/
app.on('error', err => {
    logger.error(err);
});

// app.use(history());

const server = require("http").createServer(app.callback());

server.listen(4000);

app.use(cors());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

global.query = query;

console.log("服务器已启动,端口4000");
