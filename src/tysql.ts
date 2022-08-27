import * as dotenv from 'dotenv'
import path from 'path'
import { existsSync } from 'fs'
import { database } from './lib/database'
import { helper } from './lib/helper'

/**
 * TySQL
 * Typescript MySQL Utility
 * 
 * @export
 * @class tysql
 */
export class tysql {
    /**
     * Database library instance used by TySQL
     * 
     * @private
     * @type {(database | undefined)}
     * @memberOf tysql
     */
    private db: database | undefined
    /**
     * Helper library instance used by TySQL
     * 
     * @private
     * @type {helper}
     * @memberOf tysql
     */
    private helper: helper
    /**
     * Storage of process.env to be used throughout TySQL
     * 
     * @private
     * @type {NodeJS.ProcessEnv}
     * @memberOf tysql
     */
    private env: NodeJS.ProcessEnv

    /**
     * Creates an instance of tysql.
     * @param {string} [environment] The name of the `.env` file to be used by TySQL if different from `.env`
     * 
     * @memberOf tysql
     */
    constructor(private environment__path: string = './', private environment?: string) {
        this.helper = new helper()
        this.env = this.env__load()
    }

    /**
     * Loading of the `.env` file into process.env to be used throughout TySQL
     * 
     * @private
     * @returns {NodeJS.ProcessEnv} the contents of process.env to be stored within TySQL for use within the database connections and handling
     * 
     * @memberOf tysql
     */
    private env__load = (): NodeJS.ProcessEnv => {
        if (typeof this.environment === 'undefined') {
            this.environment = '.env'
            this.helper.warn('Defaulting to using `.env` for the environment')
        }
        
        if (this.env__exists(this.environment__path, this.environment)) {
            dotenv.config({
                path: path.join(`${this.environment__path}`, `${this.environment}`)
            })
        } else {
            this.helper.warn('No `' + this.environment + '` found. Falling back to defaults')
            dotenv.config()
        }
        return process.env
    }

    /**
     * Checks to see if the requested `.env` file exists
     * 
     * @private
     * @param {string} file__name The desired `.env` file
     * @returns {boolean} Returns true if the file is found, otherwise false.
     * 
     * @memberOf tysql
     */
    private env__exists = (file__path: string, file__name: string): boolean => {
        if (existsSync(path.join(`${file__path}`, `${file__name}`)))
            return true
        return false
    }

    /**
     * Retrieve the specified `.env` file
     * 
     * @returns {string} The `.env` file that has been specified
     * 
     * @memberOf tysql
     */
    public environment__get = (): string => {
        return this.environment
    }

    public environment_path__get = (): string => {
        return this.environment__path
    }

    /**
     * Retrieve the process.env used within TySQL
     * 
     * @returns {NodeJS.ProcessEnv} The used process.env
     * 
     * @memberOf tysql
     */
    public env__get = (): NodeJS.ProcessEnv => {
        return this.env
    }

    /**
     * Check to see if the database library has been loaded.
     * 
     * @returns {boolean} Returns true if the library is loaded. Otherwise false.
     * 
     * @memberOf tysql
     */
    public db__loaded = (): boolean => {
        return (typeof this.db !== 'undefined')
    }

    /**
     * Creates a new instance of the database library.
     * 
     * @param {boolean} [use__pool=false] Boolean flag for if the database will connect via a pooled connection, or through a standard connection
     * @returns {boolean} Returns true if the database library is loaded correctly, Otherwise false.
     * 
     * @memberOf tysql
     */
    public db__load = (use__pool: boolean = false): boolean => {
        try {
            let tmp__db = new database(this.env, use__pool, this.helper)
            this.helper.info('tmp__db', tmp__db)
            this.db = tmp__db
        } catch (e) {
            this.helper.error('DB Connection error', e)
            return false
        }
    }

    /**
     * Intialisation of the actual database connection
     * 
     * @returns {Promise<boolean>} Returns a promise with a value of true if the connection has been successful. Otherwise an applicable error will be thrown
     * 
     * @memberOf tysql
     */
    public db__init = async (): Promise<boolean> => {
        return this.db.initialise()
    }

    /**
     * Running a desired query. Preferable to use a prepared sql statement to mitigate injection issues
     * 
     * @param {string} qry The query that is to be executed
     * @param {any[]} [vals] An array of the values to be injected into a prepared sql statement if applicable.
     * @returns {Promise<any>} Retrieve the resukt of the query that has been executed 
     * 
     * @memberOf tysql
     */
    public query = async (qry: string, vals?: any[]): Promise<any> => {
        return this.db.query(qry, vals)
    }

    /**
     * losing of the database connection
     * 
     * @returns {Promise<boolean>} Returns true if the connection has closed.
     * 
     * @memberOf tysql
     */
    public close = async (): Promise<boolean> => {
        return this.db.close()
    }
}