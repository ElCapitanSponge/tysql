export class helper {
    constructor() {}

    public error(message: string = '', data?: any): void {
        console.error('🔥ERROR🔥 ::: ' + message, data)
    }

    public warn(message: string = '', data?: any): void {
        console.warn('⚠️WARNING⚠️ ::: ' + message, data)
    }
}