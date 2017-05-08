import * as Hapi from "hapi";
import {IOptions} from "./interface";
import Handles from "./handles";
import validateRequest from "./validate/users-request";

export default class Routes {
    private server: Hapi.Server;
    private options: IOptions;
    private handles: any;
    constructor (server: Hapi.Server, options: IOptions) {
        this.server = server;
        this.options = options;
        this.handles = new Handles(this.server, options);
    }

     public init (): void {
            this.server.route([
            {
                method: 'POST',
                path: '/api/users',
                handler: this.handles.usersApi,
                config: {
                    validate: {
                        payload: validateRequest
                    }
                }
            }
        ]);
     }
}