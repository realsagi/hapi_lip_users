import * as Hapi from "hapi";

export interface IRegister {
    (server: Hapi.Server, options: any, next: () => void) : void;
    attributes?: any;
}

export interface IOptions {
    SALT_WORK_FACTOR?: number;
}