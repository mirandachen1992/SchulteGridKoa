import Router from 'koa-router';

import {
  saveRecord,
  login,
  getRecord,
  getList,
  getMiniProgramQrcode
} from '../controllers/recordService';
import validate from 'koa2-validation';
import Joi from 'joi';
import msgRoute from '../routers/msg';
import talktoRoute from '../routers/talkto';
import helpmiss from '../routers/helpmiss';

var router = new Router();

const saveV = {
  body: {
    openId: Joi.required(),
    nickName: Joi.string().required(),
    avatarUrl: Joi.string(),
    record: Joi.number().required(),
    type: Joi.required()
  }
}

const loginV = {
  body: {
    code: Joi.required(),
  }
}

router.post('/record/save', validate(saveV), saveRecord);

router.post('/onLogin', validate(loginV), login);

router.get('/user/:openId/type/:type/getRecord', getRecord);

router.get('/type/:type/getList', getList);

router.get('/getMiniProgramQrcode', getMiniProgramQrcode);



msgRoute(router);
talktoRoute(router);
helpmiss(router);


export default router;