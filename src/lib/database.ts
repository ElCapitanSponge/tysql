import { createPool, Pool } from 'mysql'
import { credentials } from './database.interfaces'
import { helper } from './helper'

/**
 * Database handler for TySQL
 * 
 * @export
 * @class database
 */
export class database {
    /**
     * Handler for the pooled connection type
     * 
     * @private
     * @type {Pool} The connection pool used by the database handler
     * @memberOf database
     */
    private pool: Pool
    /**
     * Handler for the straigh connection type
     * 
     * @private
     * 
     * @memberOf database
     */
    private connection

    /**
     * Object that if initalised contains the credentials to be used for the connection/s
     * 
     * @private
     * @type {(credentials | undefined)}
     * @memberOf database
     */
    private credentials: credentials | undefined
    /**
     * Creates an instance of database.
     * @param {NodeJS.ProcessEnv} env Reference to the process.env that has had the `.env` or similar, applied from TySQL
     * @param {boolean} [use__pool=false] Flag for if the pool or normal connection to the database is the be used. Defaults to NOT using the pool connection 
     * @param {helper} helper Reference to the helper utility found within TySQL
     * 
     * @memberOf database
     */
    constructor(private env: NodeJS.ProcessEnv, protected use__pool: boolean = false, protected helper: helper) {}

    /**
     * 
     * 
     * @private
     * @returns {Promise<Pool>} Promise containing either suth successful pool conneciton or an error message if the connection has failed when attempting to be established
     * 
     * @memberOf database
     */
    private pool__create(): Promise<Pool> {
        return new Promise<Pool>((resolve: Pool, reject) => {
            try {
                let tmp__pool: Pool = createPool({
                    host: process.env.db__host,
                    user: process.env.db__user,
                    password: process.env.db__password,
                    database: process.env.db__schema,
                    port: parseInt(process.env.db__port)
                })
                resolve(tmp__pool)
            } catch (error) {
                let message: string = 'Failed to initialise the connection pool'
                this.helper.error(message, error)
                reject(new Error(message))
            }
        })
    }

    public validate__env(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let valid: boolean = false

            resolve(valid)
        })
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
    public initialise(): Promise<boolean> {
        if (this.use__pool)
            return this.pool__create()
                .then((response: Pool) => {
                    this.pool = response
                    return true
                })
                .catch(error => {
                    throw error
                })
        else
            return new Promise<boolean>((resolve, reject) => {
                reject ('Connection not yet implemented')
            }) 
    }
}