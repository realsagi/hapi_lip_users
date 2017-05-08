"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./models/users");
class Handles {
    constructor(server, options) {
        this.usersApi = (request, reply) => {
            reply("test");
        };
        this.server = server;
        this.options = options;
        let db = server.plugins['hapi-mongoose'].connection;
        this.usersModel = new users_1.default(server, db);
    }
}
exports.default = Handles;
//# sourceMappingURL=handles.js.map