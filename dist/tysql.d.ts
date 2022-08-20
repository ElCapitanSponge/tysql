/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/**
 * TySQL
 * Typescript MySQL Utility
 *
 * @export
 * @class tysql
 */
export declare class tysql {
    private environment?;
    /**
     * Database library instance used by TySQL
     *
     * @private
     * @type {(database | undefined)}
     * @memberOf tysql
     */
    private db;
    /**
     * Helper library instance used by TySQL
     *
     * @private
     * @type {helper}
     * @memberOf tysql
     */
    private helper;
    /**
     * Storage of process.env to be used throughout TySQL
     *
     * @private
     * @type {NodeJS.ProcessEnv}
     * @memberOf tysql
     */
    private env;
    /**
     * Creates an instance of tysql.
     * @param {string} [environment] The name of the `.env` file to be used by TySQL if different from `.env`
     *
     * @memberOf tysql
     */
    constructor(environment?: string);
    /**
     * Loading of the `.env` file into process.env to be used throughout TySQL
     *
     * @private
     * @returns {NodeJS.ProcessEnv} the contents of process.env to be stored within TySQL for use within the database connections and handling
     *
     * @memberOf tysql
     */
    private env__load;
    /**
     * Checks to see if the requested `.env` file exists
     *
     * @private
     * @param {string} file__name The desired `.env` file
     * @returns {boolean} Returns true if the file is found, otherwise false.
     *
     * @memberOf tysql
     */
    private env__exists;
    /**
     * Retrieve the specified `.env` file
     *
     * @returns {string} The `.env` file that has been specified
     *
     * @memberOf tysql
     */
    environment__get: () => string;
    /**
     * Retrieve the process.env used within TySQL
     *
     * @returns {NodeJS.ProcessEnv} The used process.env
     *
     * @memberOf tysql
     */
    env__get: () => NodeJS.ProcessEnv;
    /**
     * Check to see if the database library has been loaded.
     *
     * @returns {boolean} Returns true if the library is loaded. Otherwise false.
     *
     * @memberOf tysql
     */
    db__loaded: () => boolean;
    /**
     * Creates a new instance of the database library.
     *
     * @param {boolean} [use__pool=false] Boolean flag for if the database will connect via a pooled connection, or through a standard connection
     * @returns {boolean} Returns true if the database library is loaded correctly, Otherwise false.
     *
     * @memberOf tysql
     */
    db__load: (use__pool?: boolean) => boolean;
    /**
     * Intialisation of the actual database connection
     *
     * @returns {Promise<boolean>} Returns a promise with a value of true if the connection has been successful. Otherwise an applicable error will be thrown
     *
     * @memberOf tysql
     */
    db__init: () => Promise<boolean>;
    /**
     *
     *
     * @param {string} qry
     * @param {any[]} [vals]
     * @returns {Promise<any>}
     *
     * @memberOf tysql
     */
    query: (qry: string, vals?: any[]) => Promise<any>;
    /**
     *
     *
     * @returns {Promise<boolean>}
     *
     * @memberOf tysql
     */
    close: () => Promise<boolean>;
}
