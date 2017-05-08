"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes");
class Plugin {
    constructor() {
        this.register = (server, options, next) => {
            let routes = new routes_1.default(server, options);
            routes.init();
            next();
        };
        this.register.attributes = {
            pkg: require("../package.json")
        };
    }
    errorInit(error) {
        if (error) {
            console.log('Error: Failed to load plugin (' + this.register.attributes.pkg.name + '):', error);
        }
    }
}
exports.default = Plugin;
//# sourceMappingURL=plugin.js.map