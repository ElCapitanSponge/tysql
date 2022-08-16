"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tysql = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const database_1 = require("./lib/database");
const helper_1 = require("./lib/helper");
class tysql {
    constructor(environment) {
        this.environment = environment;
        this.helper = new helper_1.helper();
        this.env = this.env__load();
    }
    env__load() {
        if (typeof this.environment !== 'undefined') {
            this.environment = '.env';
            this.helper.warn('Defaulting to using `.env` for the environment');
        }
        if (this.env__exists(this.environment))
            dotenv.config({
                path: path_1.default.join(__dirname, '../', `${this.environment}`)
            });
        else
            this.helper.warn('No `' + this.environment + '` found. Falling back to defaults');
        return process.env;
    }
    env__exists(file__name) {
        if ((0, fs_1.existsSync)(path_1.default.join(__dirname, '../', `${file__name}`)))
            return true;
        return false;
    }
    environment__get() {
        return this.environment;
    }
    env__get() {
        return this.env;
    }
    db__loaded() {
        return (typeof this.db === 'undefined');
    }
    db__load(use__pool = true) {
        this.db = new database_1.database(this.env, use__pool, this.helper);
        return this.db__loaded();
    }
    db__init() {
        return this.db.initialise();
    }
}
exports.tysql = tysql;
