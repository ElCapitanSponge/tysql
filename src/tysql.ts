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
    constructor(private environment?: string) {
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
    private env__load(): NodeJS.ProcessEnv {
        if (typeof this.environment !== 'undefined') {
            this.environment = '.env'
            this.helper.warn('Defaulting to using `.env` for the environment')
        }

        if (this.env__exists(this.environment))
            dotenv.config({
                path: path.join(__dirname, '../', `${this.environment}`)
            })
        else
            this.helper.warn('No `' + this.environment + '` found. Falling back to defaults')
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
    private env__exists(file__name: string): boolean {
        if (existsSync(path.join(__dirname, '../', `${file__name}`)))
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
    public environment__get(): string {
        return this.environment
    }

    /**
     * Retrieve the process.env used within TySQL
     * 
     * @returns {NodeJS.ProcessEnv} The used process.env
     * 
     * @memberOf tysql
     */
    public env__get(): NodeJS.ProcessEnv {
        return this.env
    }

    /**
     * Check to see if the database library has been loaded.
     * 
     * @returns {boolean} Returns true if the library is loaded. Otherwise false.
     * 
     * @memberOf tysql
     */
    public db__loaded(): boolean {
        return (typeof this.db === 'undefined')
    }

    /**
     * Creates a new instance of the database library.
     * 
     * @param {boolean} [use__pool=true] Boolean flag for if the database will connect via a pooled connection, or through a standard connection
     * @returns {boolean} Returns true if the database library is loaded correctly, Otherwise false.
     * 
     * @memberOf tysql
     */
    public db__load(use__pool: boolean = true): boolean {
        this.db = new database(this.env, use__pool, this.helper)
        return this.db__loaded()
    }

    /**
     * Intialisation of the actual database connection
     * 
     * @returns {Promise<boolean>} Returns a promise with a value of true if the connection has been successful. Otherwise an applicable error will be thrown
     * 
     * @memberOf tysql
     */
    public db__init(): Promise<boolean> {
        return this.db.initialise()
    }
}