import Routes from "./routes";
import {IRegister} from "./interface";

export default
class Plugin {
    constructor () {
        this.register.attributes = {
            pkg: require("../package.json")
        };
    }

    register: IRegister = (server, options, next) => {
        let routes: Routes = new Routes(server, options);
        routes.init();
        next();
    }

    errorInit (error: any): void {
        if (error) {
            console.log('Error: Failed to load plugin (' + this.register.attributes.pkg.name + '):', error);
        }
    }
}