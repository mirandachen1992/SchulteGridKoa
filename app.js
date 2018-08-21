import Koa from 'koa';
import mongoose from 'mongoose';
import bodyParser from 'koa-body-parser';

import router from './routers/router.js';

import serverConfig from './utils/server.js';
import {
  errorWrapper,
  successWrapper
} from './utils/utils.js';


mongoose.connect(serverConfig.DB_CONN_STR, {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('连接成功');
})

const app = new Koa();

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 200;
    ctx.response.body = errorWrapper(err.message)
  }
};

app.use(require('koa-static')(__dirname + '/public'))
app.use(errorHandler);
app.use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(8090);