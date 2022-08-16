"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = void 0;
class helper {
    constructor() { }
    error(message = '', data) {
        console.error('🔥ERROR🔥 ::: ' + message, data);
    }
    warn(message = '', data) {
        console.warn('⚠️WARNING⚠️ ::: ' + message, data);
    }
}
exports.helper = helper;
