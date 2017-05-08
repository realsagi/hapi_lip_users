import * as Hapi from "hapi";
import {IOptions} from "./interface";
import Users from "./models/users";

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

    public usersApi = (request: any, reply: any): void => {
        reply("test");
    }

}