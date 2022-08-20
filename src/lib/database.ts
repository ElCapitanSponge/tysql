import { createConnection, Connection, createPool, Pool, format } from 'mysql'
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
     * @type {(Pool | undefined)} The connection pool used by the database handler
     * @memberOf database
     */
    private pool: Pool | undefined
    /**
     * 
     * 
     * @private
     * @type {(Connection | undefined)}
     * @memberOf database
     */
    private connection: Connection | undefined

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
    constructor(private env: NodeJS.ProcessEnv, protected use__pool: boolean = false, protected helper: helper) {
    }

    /**
     * Creation of a pooled connection
     * 
     * @private
     * @returns {Promise<Pool>} Promise containing either suth successful pool conneciton or an error message if the connection has failed when attempting to be established
     * 
     * @memberOf database
     */
    private pool__create = (): Promise<Pool> => {
        return new Promise<Pool>((resolve: Pool, reject) => {
            try {
                let tmp__pool: Pool = createPool(this.credentials)
                resolve(tmp__pool)
            } catch (error) {
                let message: string = 'Failed to initialise the connection pool'
                this.helper.error(message, error)
                reject(new Error(message))
            }
        })
    }

    /**
     * Creation of a standard mysql connection
     * 
     * @private
     * @returns {Promise<Connection>} 
     * 
     * @memberOf database
     */
    private connection__create = (): Promise<Connection> => {
        return new Promise<Connection>((resolve: Connection, reject) => {
            try {
                let tmp__connection: Connection = createConnection(this.connection)
                resolve(tmp__connection)
            } catch (error) {
                let message: string = 'Failed to initialise the connection'
                this.helper.error(message, error)
                reject(new Error(message))
            }
        })
    }

    /**
     * Initialise the credentials that are to be used
     * 
     * @private
     * @memberOf database
     */
    private initialise__credentials = (): void => {
        this.credentials = {
            host: this.env.db__host,
            user: this.env.db__user,
            password: this.env.db__password,
            port: parseInt(this.env.db__port)
        }
        if (typeof this.env.db__database !== 'undefined')
            this.credentials.database = this.env.db__database
        if (typeof this.env.db__port !== 'undefined')
            this.credentials.port = parseInt(this.env.db__port)
    }

    /**
     * Validation of the environment variables
     * 
     * @private
     * @returns {Promise<boolean>} 
     * 
     * @memberOf database
     */
    private validate__env = (): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            if (typeof this.env.db__host === 'undefined')
                reject(new Error('DB Host is not defined'))
            if (typeof this.env.db__user === 'undefined')
                reject(new Error('DB User is not defined'))
            if (typeof this.env.db__password === 'undefined')
                reject(new Error('DB Password is not defined'))
            if (typeof this.env.db__port === 'undefined')
                reject(new Error('DB Port is not defined'))
            resolve(true)
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
    public initialise = (): Promise<boolean> => {
        return this.validate__env()
            .then((response) => {
                this.initialise__credentials()
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
                    return this.connection__create()
                        .then((response: Connection) => {
                            this.connection = response
                            return true
                        })
                        .catch(error => {
                            throw error
                        })
            })
            .catch(error => {
                throw error
            })
        
    }

    /**
     * Executing the desired query
     * 
     * @param {string} qry The query that is to be executed
     * @param {any[]} [values] The list of values to be applied to the prepared statement if applicable
     * @returns {Promise<T>} Returns the result of the query
     * 
     * @memberOf database
     */
    public query = <T>(qry: string, values?: any[]): Promise<T> => {
        // NOTE: https://www.npmjs.com/package/mysql#performing-queries
        return new Promise<T>((resolve, reject) => {
            let sql: string = ''
            if (typeof values !== 'undefined') {
                try {
                    sql = format(qry, values)
                } catch (error) {
                    let message: string = 'Failed to apply the values to the query'
                    this.helper.error(message, error)
                    reject(new Error(message))
                }
            }
            else {
                sql = qry
            }
            if (sql === '')
                reject('Empty query provided')
            try {
                if (this.use__pool) {
                    this.pool.query(sql, (error, results) => {
                        if (error) {
                            let message: string = 'Error within the query'
                            this.helper.error(message, error)
                            reject(new Error(message))
                        }
                        else resolve(results)
                    })
                } else {
                    this.connection.query(sql, (error, results) => {
                        if (error) {
                            let message: string = 'Error within the query'
                            this.helper.error(message, error)
                            reject(new Error(message))
                        }
                        else resolve(results)
                    })
                }
            } catch (error) {
                let message: string = 'Failed to execute the query'
                this.helper.error(message, error)
                reject(new Error(message))
            }
        })
    }

    /**
     * Closing of the desired connection
     * 
     * @returns {Promise<boolean>} Returns true if the connection has closed
     * 
     * @memberOf database
     */
    public close = (): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            try {
                if (this.use__pool)
                    this.pool.end((error) => {
                        if (error) {
                            let message: string = 'Failed to close the pool'
                            this.helper.error(message, error)
                            reject(new Error(message))
                        }
                        resolve(true)
                    })
                else
                    this.connection.end((error) => {
                        if (error) {
                            let message: string = 'Failed to close the connection'
                            this.helper.error(message, error)
                            reject(new Error(message))
                        }
                        resolve(true)
                    })
            } catch (error) {
                let message: string = 'Unable to close the database connection'
                this.helper.error(message, error)
                reject(new Error(message))
            }
        })
    }
}