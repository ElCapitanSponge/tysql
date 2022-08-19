/**
 * The credentials interface used for defining the details required by TySQL for connecting to the desired database
 * 
 * @export
 * @interface credentials
 */
export interface credentials {
    /**
     * The host name of the database to connect to.
     * This could be localhost, an ip address or a url
     * 
     * @type {string}
     * @memberOf credentials
     */
    host: string
    /**
     * The user account to connect to the database
     * 
     * @type {string}
     * @memberOf credentials
     */
    user: string
    /**
     * The password used for autheticating the user
     * 
     * @type {string}
     * @memberOf credentials
     */
    password: string
    /**
     * If provided the schema that is to be used
     * 
     * @type {string}
     * @memberOf credentials
     */
    schema?: string
    /**
     * The port number to be used for the connection
     * 
     * @type {number}
     * @memberOf credentials
     */
    port?: number
    /**
     * The size of the connection pool if running via a pooled connection
     * 
     * @type {number}
     * @memberOf credentials
     */
    pool__size?: number
}