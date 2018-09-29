import validate from 'koa2-validation';
import Joi from 'joi';
import {
    login,
    createSMS
} from '../controllers/talktoService';

const talktoRoute = (router) => {

    const loginV = {
        body: {
            code: Joi.required(),
        }
    }
    router.post('/talkto/onLogin', validate(loginV), login);

    const smsV = {
        openid: Joi.required(),
        tel: Joi.required(),
        text: Joi.required()
    }
    router.post('/talkto/createSMS', validate(smsV), createSMS);


}

export default talktoRoute;