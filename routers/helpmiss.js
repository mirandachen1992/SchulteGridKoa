import validate from 'koa2-validation';
import Joi from 'joi';
import {
    login,
    createHelp,
    queryHelpList
} from '../controllers/helpmissService';

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

}

export default talktoRoute;