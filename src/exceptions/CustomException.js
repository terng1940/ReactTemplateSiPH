export class CustomException extends Error {
    constructor(message, { statusCode = null, messageCode = null } = {}) {
        super(message);
        this.name = 'CustomException';
        this.statusCode = statusCode;
        this.messageCode = messageCode;
    }

    toString() {
        if (this.statusCode && this.messageCode) {
            return `Error ${this.statusCode} (${this.messageCode}): ${this.message}`;
        } else if (this.statusCode) {
            return `Error ${this.statusCode}: ${this.message}`;
        }
        return this.message;
    }
}
