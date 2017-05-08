import * as Hapi from "hapi";

export interface IRegister {
    (server: Hapi.Server, options: any, next: () => void) : void;
    attributes?: any;
}

export interface IOptions {
    SALT_WORK_FACTOR?: number;
}

export interface ISaveUsersMongoose {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}