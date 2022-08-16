import * as dotenv from 'dotenv'
import path from 'path'
import { existsSync } from 'fs'
import { database } from './lib/database'
import { helper } from './lib/helper'

export class tysql {
    private db: database | undefined
    private helper: helper
    private env: NodeJS.ProcessEnv

    constructor(private environment?: string) {
        this.helper = new helper()
        this.env = this.env__load()
    }

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

    private env__exists(file__name: string): boolean {
        if (existsSync(path.join(__dirname, '../', `${file__name}`)))
            return true
        return false
    }

    public environment__get(): string {
        return this.environment
    }

    public env__get(): NodeJS.ProcessEnv {
        return this.env
    }

    public db__loaded(): boolean {
        return (typeof this.db === 'undefined')
    }

    public db__load(use__pool: boolean = true): boolean {
        this.db = new database(this.env, use__pool, this.helper)
        return this.db__loaded()
    }

    public db__init(): Promise<any> {
        return this.db.initialise()
    }
}