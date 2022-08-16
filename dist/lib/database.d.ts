/// <reference types="node" />
import { helper } from './helper';
export declare class database {
    private env;
    protected use__pool: boolean;
    protected helper: helper;
    private pool;
    private connection;
    constructor(env: NodeJS.ProcessEnv, use__pool: boolean, helper: helper);
    private pool__create;
    initialise(): Promise<any>;
}
