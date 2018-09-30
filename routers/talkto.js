import validate from 'koa2-validation';
import Joi from 'joi';
import {
    login,
    querySMS,
    createSMS
} from '../controllers/talktoService';

const talktoRoute = (router) => {

    const loginV = {
        body: {
            code: Joi.required(),
        }
    }
    router.post('/talkto/onLogin', validate(loginV), login);

    const createSMSV = {
        openid: Joi.required(),
        tel: Joi.required(),
        text: Joi.required()
    }
    router.post('/talkto/createSMS', validate(createSMSV), createSMS);


    const querySMSV = {
        openid: Joi.required(),
        code: Joi.required(),
    }
    router.post('/talkto/querySMS', validate(querySMSV), querySMS);

}

export default talktoRoute;