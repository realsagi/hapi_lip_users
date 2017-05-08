import * as Hapi from "hapi";
import {IOptions, ISaveUsersMongoose} from "./interface";
import Users from "./models/users";
import * as Bcrypt from 'bcrypt';

export default class Handles {

    private server: Hapi.Server;
    private options: IOptions;
    private usersModel: any;

    constructor (server: Hapi.Server, options: IOptions) {
        this.server = server;
        this.options = options;
        let db: any = server.plugins['hapi-mongoose'].connection;
        this.usersModel = new Users(server, db);
    }

    private hashBcryptPassword (password: String): Promise<any> {
        let SALT_WORK_FACTOR_DEFAULT: number = 10;
        let SALT_WORK_FACTOR: number = this.options.SALT_WORK_FACTOR || SALT_WORK_FACTOR_DEFAULT;
        return new Promise((resolve: any, reject: any): void => {
            Bcrypt.genSalt(SALT_WORK_FACTOR, (err: any, salt: any) => {
                if (err) {
                    reject(err);
                }else {
                    Bcrypt.hash(password, salt, (err: any, hash: any) => {
                        if (err) {
                            reject(err);
                        }else {
                            resolve(hash);
                        }
                    });
                }
            });
        });
    }

    public usersApi = (request: any, reply: any): void => {
        let data: any = request.payload;
        let dataResponse: any = {};
        let password: string = data.password;
        let server: any = request.server;
        this.hashBcryptPassword(password).then((hash: any) => {
            let dataForSave: ISaveUsersMongoose = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hash
            };
            let users: any = new this.usersModel(dataForSave);
            return users.save();
        }).then((users: any) => {
            let dataUploadImage: any = {
                tableName: "users",
                idTableName: users._id,
                type: "profile",
                fileBinary: data.fileBinary,
                fileName: data.fileName
            };
            dataResponse['users'] = users;
            return server.methods.upload.file(dataUploadImage);
        }).then((images: any) => {
            dataResponse['images'] = images;
            reply(dataResponse);
        }).catch((err: any) => {
            console.log(err);
            this.usersModel.find({_id: dataResponse['users']._id}).remove().exec();
            let statusCodeError: number = 500;
            reply(err).code(statusCodeError);
        });
    }

}