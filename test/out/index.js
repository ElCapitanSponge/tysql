"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const tysql_1 = require("../../dist/tysql");
class test {
    constructor(path, env) {
        this.path = path;
        this.env = env;
        this.t = new tysql_1.tysql(path, env);
    }
}
let pool__use = false;
let p = path_1.default.join(__dirname, '../');
let test__bind = new test(p, '.env');
let close__connection = () => {
    console.log('=== CLOSE ===');
    test__bind.t.close()
        .then(response => console.log('close ::: response', response))
        .catch(error => {
        console.error('close ::: error', error);
        process.exitCode = 9;
        process.exit();
    });
};
let test__queries = () => {
    console.log('=== QUERY ===');
    console.log('== PREPARED ==');
    test__bind.t.query('SELECT SUM(? + ?)', [1, 2])
        .then(response => console.log('query ::: response', response))
        .catch(error => {
        console.error('query ::: error', error);
        process.exitCode = 9;
        process.exit();
    });
    console.log('== NON-PREPARED ==');
    test__bind.t.query('SELECT SUM(1 + 2)')
        .then(response => console.log('query ::: response', response))
        .then(() => close__connection())
        .catch(error => {
        console.error('query ::: error', error);
        process.exitCode = 9;
        process.exit();
    });
};
console.log('test__bind.t.db__loaded()', test__bind.t.db__loaded());
console.log('=== DB CONNECTION ===');
console.log('test__bind.t.db__load()', test__bind.t.db__load(pool__use));
test__bind.t.db__init()
    .then(response => {
    console.log('db__init ::: response', response);
    test__queries();
})
    .catch(error => {
    console.error('db__init ::: error', error);
    process.exitCode = 9;
    process.exit();
});
