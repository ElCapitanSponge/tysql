"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = void 0;
/**
 * Helper utility for resueable functions within TySQL
 *
 * @export
 * @class helper
 */
class helper {
    /**
     * Creates an instance of helper.
     *
     * @memberOf helper
     */
    constructor() { }
    /**
     * Prints and error message to the console using the supplied information
     *
     * @param {string} [message=''] The desired message string
     * @param {*} [data] Other helpful details, such as a stack trace, or something similar (if applicable)
     *
     * @memberOf helper
     */
    error(message = '', data) {
        console.error('🔥ERROR🔥 ::: ' + message, data);
    }
    /**
     * Prints a warning message to the console using the supplied information
     *
     * @param {string} [message=''] The desired message string
     * @param {*} [data] Other helpul details, such as a stack trace, applicable variable or something similar (if applicable)
     *
     * @memberOf helper
     */
    warn(message = '', data) {
        console.warn('⚠️WARNING⚠️ ::: ' + message, data);
    }
    /**
     * Prints an information message to the console using the supplied information
     *
     * @param {string} [message=''] The desired message string
     * @param {*} [data] Other helpul details, such as a stack trace, applicable variable or something similar (if applicable)
     *
     * @memberOf helper
     */
    info(message = '', data) {
        console.info('ℹ️ INFO ℹ️ ::: ' + message, data);
    }
}
exports.helper = helper;
