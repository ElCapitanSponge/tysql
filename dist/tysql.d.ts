/// <reference types="node" />
export declare class tysql {
    private environment?;
    private db;
    private helper;
    private env;
    constructor(environment?: string);
    private env__load;
    private env__exists;
    environment__get(): string;
    env__get(): NodeJS.ProcessEnv;
    db__loaded(): boolean;
    db__load(use__pool?: boolean): boolean;
    db__init(): Promise<any>;
}
