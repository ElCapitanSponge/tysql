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
     * @type {(Pool | undefined)} The connection pool used by the database handler
     * @memberOf database
     */
    private pool;
    /**
     *
     *
     * @private
     * @type {(Connection | undefined)}
     * @memberOf database
     */
    private connection;
    /**
     * Object that if initalised contains the credentials to be used for the connection/s
     *
     * @private
     * @type {(credentials | undefined)}
     * @memberOf database
     */
    private credentials;
    /**
     * Creates an instance of database.
     * @param {NodeJS.ProcessEnv} env Reference to the process.env that has had the `.env` or similar, applied from TySQL
     * @param {boolean} [use__pool=false] Flag for if the pool or normal connection to the database is the be used. Defaults to NOT using the pool connection
     * @param {helper} helper Reference to the helper utility found within TySQL
     *
     * @memberOf database
     */
    constructor(env: NodeJS.ProcessEnv, use__pool: boolean, helper: helper);
    /**
     * Creation of a pooled connection
     *
     * @private
     * @returns {Promise<Pool>} Promise containing either suth successful pool conneciton or an error message if the connection has failed when attempting to be established
     *
     * @memberOf database
     */
    private pool__create;
    /**
     * Creation of a standard mysql connection
     *
     * @private
     * @returns {Promise<Connection>}
     *
     * @memberOf database
     */
    private connection__create;
    /**
     * Initialise the credentials that are to be used
     *
     * @private
     * @memberOf database
     */
    private initialise__credentials;
    /**
     * Validation of the environment variables
     *
     * @private
     * @returns {Promise<boolean>}
     *
     * @memberOf database
     */
    private validate__env;
    /**
     * Initialising the connection to the database.
     * If flagged to use a pooled connection, this will be initalised and handled as required.
     * Otherwise a normal connection will be initalised and handled as required.
     *
     * @returns {Promise<boolean>} The promise returns true if the conenction has been successful, otherwise an applicable error will be thrown
     *
     * @memberOf database
     */
    initialise: () => Promise<boolean>;
    /**
     * Executing the desired query
     *
     * @param {string} qry The query that is to be executed
     * @param {any[]} [values] The list of values to be applied to the prepared statement if applicable
     * @returns {Promise<T>} Returns the result of the query
     *
     * @memberOf database
     */
    query: <T>(qry: string, values?: any[]) => Promise<T>;
    /**
     * Closing of the desired connection
     *
     * @returns {Promise<boolean>} Returns true if the connection has closed
     *
     * @memberOf database
     */
    close: () => Promise<boolean>;
}
