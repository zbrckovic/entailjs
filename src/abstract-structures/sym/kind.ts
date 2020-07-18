/**
 * Represents two possible kinds of expressions.
 *
 * By extension `Sym` will also be of a specific kind depending on whether it forms a formula or a
 * term.
 */
export enum Kind {
    /**
     * Represents an expression standing for something which is either true or false (sentence).
     */
    Formula = 'Formula',
    /**
     * Represents an expression standing for a specific object (name).
     */
    Term = 'Term'
}
