"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseHidden = require("mongoose-hidden");
class Users {
    constructor(server, db) {
        this.server = server;
        this.db = db;
        this.mongoose = server.plugins['hapi-mongoose'].lib;
        let usersSchema = new this.mongoose.Schema({
            firstName: String,
            lastName: String,
            email: String,
            password: { type: String, hide: true }
        });
        usersSchema.plugin(mongooseHidden());
        return this.db.model('users', usersSchema);
    }
}
exports.default = Users;
//# sourceMappingURL=users.js.map