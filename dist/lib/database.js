"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mysql_1 = require("mysql");
/**
 * Database handler for TySQL
 *
 * @export
 * @class database
 */
class database {
    /**
     * Creates an instance of database.
     * @param {NodeJS.ProcessEnv} env Reference to the process.env that has had the `.env` or similar, applied from TySQL
     * @param {boolean} [use__pool=true] Flag for if the pool or normal connection to the database is the be used. Defaults to using the pool connection
     * @param {helper} helper Reference to the helper utility found within TySQL
     *
     * @memberOf database
     */
    constructor(env, use__pool = true, helper) {
        this.env = env;
        this.use__pool = use__pool;
        this.helper = helper;
    }
    /**
     *
     *
     * @private
     * @returns {Promise<Pool>} Promise containing either suth successful pool conneciton or an error message if the connection has failed when attempting to be established
     *
     * @memberOf database
     */
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
    /**
     * Initialising the connection to the database.
     * If flagged to use a pooled connection, this will be initalised and handled as required.
     * Otherwise a normal connection will be initalised and handled as required.
     *
     * @returns {Promise<boolean>} The promise returns true if the conenction has been successful, otherwise an applicable error will be thrown
     *
     * @memberOf database
     */
    initialise() {
        if (this.use__pool)
            return this.pool__create()
                .then((response) => {
                this.pool = response;
                return true;
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
