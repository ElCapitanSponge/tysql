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
     * @param {boolean} [use__pool=false] Flag for if the pool or normal connection to the database is the be used. Defaults to NOT using the pool connection
     * @param {helper} helper Reference to the helper utility found within TySQL
     *
     * @memberOf database
     */
    constructor(env, use__pool = false, helper) {
        this.env = env;
        this.use__pool = use__pool;
        this.helper = helper;
        /**
         *
         *
         * @private
         * @returns {Promise<Pool>} Promise containing either suth successful pool conneciton or an error message if the connection has failed when attempting to be established
         *
         * @memberOf database
         */
        this.pool__create = () => {
            return new Promise((resolve, reject) => {
                try {
                    let tmp__pool = (0, mysql_1.createPool)(this.credentials);
                    resolve(tmp__pool);
                }
                catch (error) {
                    let message = 'Failed to initialise the connection pool';
                    this.helper.error(message, error);
                    reject(new Error(message));
                }
            });
        };
        /**
         *
         *
         * @private
         * @returns {Promise<Connection>}
         *
         * @memberOf database
         */
        this.connection__create = () => {
            return new Promise((resolve, reject) => {
                try {
                    let tmp__connection = (0, mysql_1.createConnection)(this.connection);
                    resolve(tmp__connection);
                }
                catch (error) {
                    let message = 'Failed to initialise the connection';
                    this.helper.error(message, error);
                    reject(new Error(message));
                }
            });
        };
        /**
         *
         *
         * @returns {Promise<boolean>}
         *
         * @memberOf database
         */
        this.validate__env = () => {
            return new Promise((resolve, reject) => {
                let valid = false;
                resolve(valid);
            });
        };
        /**
         * Initialising the connection to the database.
         * If flagged to use a pooled connection, this will be initalised and handled as required.
         * Otherwise a normal connection will be initalised and handled as required.
         *
         * @returns {Promise<boolean>} The promise returns true if the conenction has been successful, otherwise an applicable error will be thrown
         *
         * @memberOf database
         */
        this.initialise = () => {
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
                return this.connection__create()
                    .then((response) => {
                    this.connection = response;
                    return true;
                })
                    .catch(error => {
                    throw error;
                });
        };
        /**
         *
         *
         * @param {string} qry The query that is to be executed
         * @param {any[]} [values] The list of values to be applied to the prepared statement if applicable
         * @returns {Promise<T>}
         *
         * @memberOf database
         */
        this.query = (qry, values) => {
            // NOTE: https://www.npmjs.com/package/mysql#performing-queries
            return new Promise((resolve, reject) => {
                let sql = '';
                if (typeof values !== 'undefined') {
                    try {
                        sql = (0, mysql_1.format)(qry, values);
                    }
                    catch (error) {
                        let message = 'Failed to apply the values to the query';
                        this.helper.error(message, error);
                        reject(new Error(message));
                    }
                }
                else {
                    sql = qry;
                }
                if (sql === '')
                    reject('Empty query provided');
                try {
                    if (this.use__pool) {
                        this.pool.query(sql, (error, results) => {
                            if (error) {
                                let message = 'Error within the query';
                                this.helper.error(message, error);
                                reject(new Error(message));
                            }
                            else
                                resolve(results);
                        });
                    }
                    else {
                        this.connection.query(sql, (error, results) => {
                            if (error) {
                                let message = 'Error within the query';
                                this.helper.error(message, error);
                                reject(new Error(message));
                            }
                            else
                                resolve(results);
                        });
                    }
                }
                catch (error) {
                    let message = 'Failed to execute the query';
                    this.helper.error(message, error);
                    reject(new Error(message));
                }
            });
        };
        /**
         *
         *
         * @returns {Promise<boolean>}
         *
         * @memberOf database
         */
        this.close = () => {
            return new Promise((resolve, reject) => {
                try {
                    if (this.use__pool)
                        this.pool.end((error) => {
                            if (error) {
                                let message = 'Failed to close the pool';
                                this.helper.error(message, error);
                                reject(new Error(message));
                            }
                            resolve(true);
                        });
                    else
                        this.connection.end((error) => {
                            if (error) {
                                let message = 'Failed to close the connection';
                                this.helper.error(message, error);
                                reject(new Error(message));
                            }
                            resolve(true);
                        });
                }
                catch (error) {
                    let message = 'Unable to close the database connection';
                    this.helper.error(message, error);
                    reject(new Error(message));
                }
            });
        };
        this.credentials = {
            host: this.env.db__host,
            user: this.env.db__user,
            password: this.env.db__password,
            port: parseInt(this.env.db__port)
        };
        if (typeof this.env.db__database !== 'undefined')
            this.credentials.database = this.env.db__database;
        if (typeof this.env.db__port !== 'undefined')
            this.credentials.port = parseInt(this.env.db__port);
    }
}
exports.database = database;
