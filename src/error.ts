/**
 * Base error of the whole project.
 *
 * Whenever we throw an error which should be caught, that error should inherit this base class.
 */
export abstract class EntailCoreError extends Error {
    constructor(message?: string) {
        super(message)

        // This might create problems if code is minified.
        this.name = this.constructor.name
    }
}
