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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
/**
 * TySQL
 * Typescript MySQL Utility
 *
 * @export
 * @class tysql
 */
class tysql {
    /**
     * Creates an instance of tysql.
     * @param {string} [environment] The name of the `.env` file to be used by TySQL if different from `.env`
     *
     * @memberOf tysql
     */
    constructor(environment__path = './', environment) {
        this.environment__path = environment__path;
        this.environment = environment;
        /**
         * Loading of the `.env` file into process.env to be used throughout TySQL
         *
         * @private
         * @returns {NodeJS.ProcessEnv} the contents of process.env to be stored within TySQL for use within the database connections and handling
         *
         * @memberOf tysql
         */
        this.env__load = () => {
            if (typeof this.environment === 'undefined') {
                this.environment = '.env';
                this.helper.warn('Defaulting to using `.env` for the environment');
            }
            if (this.env__exists(this.environment__path, this.environment)) {
                dotenv.config({
                    path: path_1.default.join(`${this.environment__path}`, `${this.environment}`)
                });
            }
            else {
                this.helper.warn('No `' + this.environment + '` found. Falling back to defaults');
                dotenv.config();
            }
            return process.env;
        };
        /**
         * Checks to see if the requested `.env` file exists
         *
         * @private
         * @param {string} file__name The desired `.env` file
         * @returns {boolean} Returns true if the file is found, otherwise false.
         *
         * @memberOf tysql
         */
        this.env__exists = (file__path, file__name) => {
            if ((0, fs_1.existsSync)(path_1.default.join(`${file__path}`, `${file__name}`)))
                return true;
            return false;
        };
        /**
         * Retrieve the specified `.env` file
         *
         * @returns {string} The `.env` file that has been specified
         *
         * @memberOf tysql
         */
        this.environment__get = () => {
            return this.environment;
        };
        this.environment_path__get = () => {
            return this.environment__path;
        };
        /**
         * Retrieve the process.env used within TySQL
         *
         * @returns {NodeJS.ProcessEnv} The used process.env
         *
         * @memberOf tysql
         */
        this.env__get = () => {
            return this.env;
        };
        /**
         * Check to see if the database library has been loaded.
         *
         * @returns {boolean} Returns true if the library is loaded. Otherwise false.
         *
         * @memberOf tysql
         */
        this.db__loaded = () => {
            return (typeof this.db !== 'undefined');
        };
        /**
         * Creates a new instance of the database library.
         *
         * @param {boolean} [use__pool=false] Boolean flag for if the database will connect via a pooled connection, or through a standard connection
         * @returns {boolean} Returns true if the database library is loaded correctly, Otherwise false.
         *
         * @memberOf tysql
         */
        this.db__load = (use__pool = false) => {
            this.db = new database_1.database(this.env, use__pool, this.helper);
            return this.db__loaded();
        };
        /**
         * Intialisation of the actual database connection
         *
         * @returns {Promise<boolean>} Returns a promise with a value of true if the connection has been successful. Otherwise an applicable error will be thrown
         *
         * @memberOf tysql
         */
        this.db__init = () => __awaiter(this, void 0, void 0, function* () {
            return this.db.initialise();
        });
        /**
         * Running a desired query. Preferable to use a prepared sql statement to mitigate injection issues
         *
         * @param {string} qry The query that is to be executed
         * @param {any[]} [vals] An array of the values to be injected into a prepared sql statement if applicable.
         * @returns {Promise<any>} Retrieve the resukt of the query that has been executed
         *
         * @memberOf tysql
         */
        this.query = (qry, vals) => __awaiter(this, void 0, void 0, function* () {
            return this.db.query(qry, vals);
        });
        /**
         * losing of the database connection
         *
         * @returns {Promise<boolean>} Returns true if the connection has closed.
         *
         * @memberOf tysql
         */
        this.close = () => __awaiter(this, void 0, void 0, function* () {
            return this.db.close();
        });
        this.helper = new helper_1.helper();
        this.env = this.env__load();
    }
}
exports.tysql = tysql;
