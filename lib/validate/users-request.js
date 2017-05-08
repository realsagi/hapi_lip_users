"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
class ValidateUsers {
    constructor() {
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
exports.default = ValidateUsers;
//# sourceMappingURL=users-request.js.map