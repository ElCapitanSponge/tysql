"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mysql_1 = require("mysql");
class database {
    constructor(env, use__pool = true, helper) {
        this.env = env;
        this.use__pool = use__pool;
        this.helper = helper;
    }
    pool__create() {
        return new Promise((resolve, reject) => {
            try {
                let tmp__pool = (0, mysql_1.createPool)({
                    host: process.env.db__host,
                    user: process.env.db__user,
                    password: process.env.db__password,
                    database: process.env.db__schema,
                    port: parseInt(process.env.db__port)
                });
                resolve(tmp__pool);
            }
            catch (error) {
                let message = 'Failed to initialise the connection pool';
                this.helper.error(message, error);
                reject(new Error(message));
            }
        });
    }
    initialise() {
        if (this.use__pool)
            return this.pool__create()
                .then((response) => {
                return this.pool = response;
            })
                .catch(error => {
                throw error;
            });
        else
            return new Promise((resolve, reject) => {
                reject('Connection not yet implemented');
            });
    }
}
exports.database = database;
