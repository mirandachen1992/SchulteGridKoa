import validate from 'koa2-validation';
import Joi from 'joi';
import {
    login,
    createHelp,
    queryHelpList,
    queryHelpType,
    upload
} from '../controllers/helpmissService';
import uploadFile from '../utils/uploadFile';

const multiparty = require('koa2-multiparty');

const talktoRoute = (router) => {

    const loginV = {
        body: {
            code: Joi.required(),
        }
    }
    router.post('/helpmiss/onLogin', validate(loginV), login);

    const createHelpV = {};

    router.post('/helpmiss/createHelp', validate(createHelpV), createHelp);

    router.post('/helpmiss/queryHelpList', validate({
        counts: Joi.required()
    }), queryHelpList);

    router.get('/helpmiss/queryHelpType', queryHelpType);


    //路由
    router.post('/helpmiss/upload', uploadFile('helpmiss').single('file'), upload)

}

export default talktoRoute;