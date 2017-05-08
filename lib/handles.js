"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./models/users");
const Bcrypt = require("bcrypt");
class Handles {
    constructor(server, options) {
        this.usersApi = (request, reply) => {
            let data = request.payload;
            let dataResponse = {};
            let password = data.password;
            let server = request.server;
            this.hashBcryptPassword(password).then((hash) => {
                let dataForSave = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hash
                };
                let users = new this.usersModel(dataForSave);
                return users.save();
            }).then((users) => {
                let dataUploadImage = {
                    tableName: "users",
                    idTableName: users._id,
                    type: "profile",
                    fileBinary: data.fileBinary,
                    fileName: data.fileName
                };
                dataResponse['users'] = users;
                return server.methods.upload.file(dataUploadImage);
            }).then((images) => {
                dataResponse['images'] = images;
                reply(dataResponse);
            }).catch((err) => {
                console.log(err);
                this.usersModel.find({ _id: dataResponse['users']._id }).remove().exec();
                let statusCodeError = 500;
                reply(err).code(statusCodeError);
            });
        };
        this.server = server;
        this.options = options;
        let db = server.plugins['hapi-mongoose'].connection;
        this.usersModel = new users_1.default(server, db);
    }
    hashBcryptPassword(password) {
        let SALT_WORK_FACTOR_DEFAULT = 10;
        let SALT_WORK_FACTOR = this.options.SALT_WORK_FACTOR || SALT_WORK_FACTOR_DEFAULT;
        return new Promise((resolve, reject) => {
            Bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                if (err) {
                    reject(err);
                }
                else {
                    Bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(hash);
                        }
                    });
                }
            });
        });
    }
}
exports.default = Handles;
//# sourceMappingURL=handles.js.map