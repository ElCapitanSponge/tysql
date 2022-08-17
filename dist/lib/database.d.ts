/// <reference types="node" />
import { helper } from './helper';
/**
 * Database handler for TySQL
 *
 * @export
 * @class database
 */
export declare class database {
    private env;
    protected use__pool: boolean;
    protected helper: helper;
    /**
     * Handler for the pooled connection type
     *
     * @private
     * @type {Pool} The connection pool used by the database handler
     * @memberOf database
     */
    private pool;
    /**
     * Handler for the straigh connection type
     *
     * @private
     *
     * @memberOf database
     */
    private connection;
    /**
     * Creates an instance of database.
     * @param {NodeJS.ProcessEnv} env Reference to the process.env that has had the `.env` or similar, applied from TySQL
     * @param {boolean} [use__pool=true] Flag for if the pool or normal connection to the database is the be used. Defaults to using the pool connection
     * @param {helper} helper Reference to the helper utility found within TySQL
     *
     * @memberOf database
     */
    constructor(env: NodeJS.ProcessEnv, use__pool: boolean, helper: helper);
    /**
     *
     *
     * @private
     * @returns {Promise<Pool>} Promise containing either suth successful pool conneciton or an error message if the connection has failed when attempting to be established
     *
     * @memberOf database
     */
    private pool__create;
    /**
     * Initialising the connection to the database.
     * If flagged to use a pooled connection, this will be initalised and handled as required.
     * Otherwise a normal connection will be initalised and handled as required.
     *
     * @returns {Promise<boolean>} The promise returns true if the conenction has been successful, otherwise an applicable error will be thrown
     *
     * @memberOf database
     */
    initialise(): Promise<boolean>;
}
