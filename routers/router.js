import Router from 'koa-router';

import { saveRecord, login, getRecord, getList } from '../controllers/recordService';
import validate from 'koa2-validation';
import Joi from 'joi';
var router = new Router();

const saveV = {
  body: {
    openId: Joi.required(),
    nickName: Joi.string().required(),
    avatarUrl: Joi.string(),
    record:Joi.number().required(),
    type:Joi.required()
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



export default router;