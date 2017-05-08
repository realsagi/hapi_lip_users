import * as Hapi from "hapi";
import * as mongooseHidden from 'mongoose-hidden';

export default class Users {
    private server: Hapi.Server;
    private mongoose: any;
    private db: any;
    constructor (server: Hapi.Server, db: any) {
        this.server = server;
        this.db = db;
        this.mongoose = server.plugins['hapi-mongoose'].lib;

        let usersSchema: any = new this.mongoose.Schema({
            firstName: String,
            lastName: String,
            email: String,
            password: { type: String, hide: true }
        });
        usersSchema.plugin(mongooseHidden());
        return this.db.model('users', usersSchema);
    }
}