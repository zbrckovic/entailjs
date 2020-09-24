import { conjunction, disjunction, equivalence, implication, negation } from '../primitive-syms'
import _ from 'lodash'

export const primitiveTruthFunctions = {
  [negation.id]: t => !t,
  [conjunction.id]: (a, b) => a && b,
  [disjunction.id]: (a, b) => a || b,
  [implication.id]: (a, b) => !a || b,
  [equivalence.id]: (a, b) => a === b
}

export const generateValuesPermutations = arity =>
  _.range(
    0,
    Math.pow(2, arity)
  ).map(
    x => x.toString(2)
      .padStart(arity, '0')
      .split('')
      .map(x => x === '1')
  )
