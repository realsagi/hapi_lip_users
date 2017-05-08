"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Users {
    constructor(server, db) {
        this.server = server;
        this.db = db;
        this.mongoose = server.plugins['hapi-mongoose'].lib;
        let imagesSchema = new this.mongoose.Schema({
            firstName: String,
            lastName: String,
            email: String,
            password: { type: String, hide: true }
        });
        return this.db.model('users', imagesSchema);
    }
}
exports.default = Users;
//# sourceMappingURL=users.js.map