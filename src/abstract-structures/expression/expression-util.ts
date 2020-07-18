import { ExpressionError } from 'abstract-structures/expression/error'
import { Sym } from 'abstract-structures/sym'
import { List } from 'immutable'
import { Expression } from './expression'

/**
 * Reduce `expressions` to a single expression using binary connective. Reduction is performed from
 * left to right.
 *
 * From A, B, C we will get ((A, B), C), not (A, (B, C)).
 */
export const connectWithBinarySym = (expressions: Expression[], sym: Sym) => {
    if (expressions.length < 2) throw new NotEnoughExpressionsError()
    const [first, second, ...rest] = expressions

    const connect = (first: Expression, second: Expression) => new Expression({
        sym,
        children: List.of(first, second)
    })

    return rest.reduce(connect, connect(first, second))
}

export class NotEnoughExpressionsError extends ExpressionError {}
