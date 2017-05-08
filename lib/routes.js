"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handles_1 = require("./handles");
const users_request_1 = require("./validate/users-request");
class Routes {
    constructor(server, options) {
        this.server = server;
        this.options = options;
        this.handles = new handles_1.default(this.server, options);
    }
    init() {
        this.server.route([
            {
                method: 'POST',
                path: '/api/users',
                handler: this.handles.usersApi,
                config: {
                    validate: {
                        payload: new users_request_1.default()
                    }
                }
            }
        ]);
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map