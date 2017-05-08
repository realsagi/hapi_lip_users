import * as Joi from 'joi';

export default class ValidateUsers {
    constructor () {
        return {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            fileBinary: Joi.string().required(),
            fileName: Joi.string().required()
        };
    }
}