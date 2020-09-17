import { createError, ErrorName } from '../../error'
import { Expression } from './expression'

/**
 * Reduce `expressions` to a single expression using binary connective. Reduction is performed from
 * left to right.
 *
 * From A, B, C we will get ((A, B), C), not (A, (B, C)).
 */
export const connectWithBinarySym = (expressions, sym) => {
  if (expressions.length < 2) throw createError(ErrorName.NOT_ENOUGH_EXPRESSIONS)
  const [first, second, ...rest] = expressions

  const connect = (first, second) => Expression.create({
    sym,
    children: [first, second]
  })

  return rest.reduce(connect, connect(first, second))
}
