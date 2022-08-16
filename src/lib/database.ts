import { createPool, Pool } from 'mysql'
import { helper } from './helper'

export class database {
    private pool: Pool
    private connection

    constructor(private env: NodeJS.ProcessEnv, protected use__pool: boolean = true, protected helper: helper) {}

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

    public initialise(): Promise<any> {
        if (this.use__pool)
            return this.pool__create()
                .then((response: Pool) => {
                    return this.pool = response
                })
                .catch(error => {
                    throw error
                })
        else
            return new Promise((resolve, reject) => {
                reject ('Connection not yet implemented')
            }) 
    }
}