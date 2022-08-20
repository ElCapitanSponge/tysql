/**
 * Helper utility for resueable functions within TySQL
 *
 * @export
 * @class helper
 */
export declare class helper {
    /**
     * Creates an instance of helper.
     *
     * @memberOf helper
     */
    constructor();
    /**
     * Prints and error message to the console using the supplied information
     *
     * @param {string} [message=''] The desired message string
     * @param {*} [data] Other helpful details, such as a stack trace, or something similar (if applicable)
     *
     * @memberOf helper
     */
    error(message?: string, data?: any): void;
    /**
     * Prints a warning message to the console using the supplied information
     *
     * @param {string} [message=''] The desired message string
     * @param {*} [data] Other helpul details, such as a stack trace, applicable variable or something similar (if applicable)
     *
     * @memberOf helper
     */
    warn(message?: string, data?: any): void;
    /**
     * Prints an information message to the console using the supplied information
     *
     * @param {string} [message=''] The desired message string
     * @param {*} [data] Other helpul details, such as a stack trace, applicable variable or something similar (if applicable)
     *
     * @memberOf helper
     */
    info(message?: string, data?: any): void;
}
